'use strict';
require('dotenv').config();
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var db        = {};

var opt = {
  host: CONFIG.db_host,
  dialect: CONFIG.db_dialect,
  port: CONFIG.db_port,
  operatorsAliases: false,
  timezone:'+08:00',

};

if(process.env.NODE_ENV=='production')
{
  opt.logging = false;
}

const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, opt);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {

    var model = sequelize['import'](path.join(__dirname, file));

    if(model.name)
    {
      model.cache = function ( device_id) {

        this.caching = true;
        this.device_id = device_id;
        return this;
      };
  
      model.afterFind( (a,c)=>{
       model.caching =false;
  
      });
  
      db[model.name] = model;
    }

  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const select = sequelize.queryInterface.select;

const seqQuery = sequelize.dialect.Query;

const handleSelect = sequelize.dialect.Query.prototype.handleSelectQuery;

sequelize.queryInterface.select = async function(model, tableName, options){
  

  if (!model.caching ||!client.connected || process.env.Redis_cache=='false') {
    
      return select.apply(this, arguments);
  }

  let hashkey  = {"model":model.name,"options":options.where};

  if(options.include)
  {
    let include = options.include.map( element =>{

      return {model:element.model,where:(element.where)?element.where:''}

    }); 

    hashkey.include = include;
  }

  hashkey.extraoptions = {
        order:options.order||'',
        having:options.having||'',
        limit:options.limit||'',
        offset:options.offset||'',
        attributes:options.attributes
  }



  hashkey = JSON.stringify(hashkey);

  let cacheValue = await client.hget(model.device_id,hashkey)

  if(cacheValue)
  {
    cacheValue = JSON.parse(cacheValue);

    options.fromCache = true;

    seqQuery.prototype.options = options
    seqQuery.prototype.model = model

    return seqQuery.prototype.handleSelectQuery(cacheValue);
    
  }

  var data = arguments;
  data[2].hashkey = hashkey;


  return select.apply(this,data)
}

sequelize.dialect.Query.prototype.handleSelectQuery = async function(queryResult){


  if (this.model && this.model.caching && client.connected && !this.options.fromCache &&  process.env.Redis_cache!='false') {

    let hashkey  = this.options.hashkey;

    client.hset(this.model.device_id,hashkey,JSON.stringify(queryResult));
    client.expire(this.model.device_id, CONFIG.redisCacheTime);

  }

  return handleSelect.apply(this,arguments);

}


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


const clearCache = async function(req, res, next) {

  await next();

  if(client.connected &&  process.env.Redis_cache!='false' && DEVICE)
    client.del(DEVICE);

};
module.exports.clearCache = clearCache;