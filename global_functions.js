const moment = require('moment');

to = function(promise) {//global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
    return promise
    .then(data => {
        return [null, data];
    }).catch(err =>
        [pe(err)]
    );
}

pe = require('parse-error');//parses error so you can read error message and handle them accordingly

TE = function(err_message, log){ // TE stands for Throw Error
    if(log === true){
        console.error(err_message);
    }

    throw new Error(err_message);
}

ReE = function(res, err, code, data = null){ // Error Web Response
    
    if(typeof err == 'object' && typeof err.message != 'undefined'){
        err = err.message;
    }

    let send_data = {success:false, message: err};

    if(data && typeof data == 'object'){
        send_data = Object.assign(data, send_data);//merge the objects
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
}

ReS = function(res, msg, data, code){ // Success Web Response
    let send_data = {success:true, message: msg};

    if(typeof data == 'object'){
        send_data = Object.assign(data, send_data);//merge the objects
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
};

request = require('request');




randomStr = function(m,remove_unessery = false){

    var m = m || 9; s = '';
    let r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    
    if(remove_unessery)
    {    
        // r = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
        r = '0123456789';
    }

	for (var i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
    return s;
    
};

Keyfilter = function (body,filterkey){
    
    const filtered = Object.keys(body)
      .filter(key => filterkey.includes(key))
      .reduce((obj, key) => {
        obj[key] = body[key];
        return obj;
      }, {});

    return filtered;
}



checkDirectorySync = function(directory){
    const fs = require('fs');
    return new Promise((resolve, reject) => {
        fs.stat(directory, function(err) {
            if(err)
            {
                 //Check if error defined and the error code is "not exists"
                if (err.code === 'ENOENT') {
                    fs.mkdir(directory, (error) => {
                        if (error) {
                            
                            if(err.code === 'ENOENT')
                                reject(new Error('Upload Directory Not Found!'));
                            else
                                reject(error);
                        } else {
                            resolve(directory);
                        }
                    });
                }else {
                    //just in case there was a different error:            
                    reject(err);
                }
            } else {
                resolve(directory);
            }
        });
    });
}

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});

generate = size => {
    
    const randomNumber = require("random-number-csprng");

    return new Promise((resolve, reject) => {
      var code = [];
  
      var splitter = 2;
      var divider = Math.floor(size / splitter);
      while (divider > 9) {
        splitter++;
        divider = Math.floor(size / splitter);
      }
  
      var min_num = Math.pow(10, divider - 1);
      var max_num = Math.pow(10, divider) - 1;
  
      // console.log({ divider, splitter, min_num, max_num });
  
      var i = 0;
      while (i < splitter) {
        code[i] = randomNumber(min_num, max_num);
        i++;
      }
  
      var reminder = size % divider;
      if (reminder) {
        var reminder_min = Math.pow(10, reminder - 1);
        var reminder_max = Math.pow(10, reminder) - 1;
        code[i] = randomNumber(reminder_min, reminder_max);
  
        // console.log({ reminder, reminder_min, reminder_max });
      }
  
      Promise.all(code)
        .then(data => {

          resolve(data);

        })
        .catch(err => reject(err));
    });
};


capitalize = (string) => string.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');


 parseBool = function(str) 
        {
            // console.log(typeof str);
            // strict: JSON.parse(str)
        
            if(str == null)
                return false;
        
            if (typeof str === 'boolean')
            {
                return (str === true);
            } 
        
            if(typeof str === 'string')
            {
                if(str == "")
                    return false;
        
                str = str.replace(/^\s+|\s+$/g, '');
                if(str.toLowerCase() == 'true' || str.toLowerCase() == 'yes')
                    return true;

                if(str.toLowerCase() == 'false' || str.toLowerCase() == 'no')
                    return true;
        
                str = str.replace(/,/g, '.');
                str = str.replace(/^\s*\-\s*/g, '-');
            }
        
            // var isNum = string.match(/^[0-9]+$/) != null;
            // var isNum = /^\d+$/.test(str);
            if(!isNaN(str))
                return (parseFloat(str) != 0);
        
            return false;
        }
        
 WSRes =function(type,success,message){

    let current = moment().tz('Asia/Kuala_Lumpur').format('YYYY-MM-DD HH:mm:ss')

    return JSON.stringify({"type":type,"success": success, "message": message,"responseTime":current})
}

ObjectoArray = function(value)
{   
    if(typeof value != "object")
        return false

    var array = new Array();
    console.log("inside ObjectoArray early"+ typeof array)
    for(var i=0;i<value.length;i++)
    {
        array.push(value[i])
    }
    console.log("inside ObjectoArray "+array)
    console.log("inside ObjectoArray "+typeof array)

    return array
}

//object = query object, key = column name need to filter
queryConvertArray = function(object,key)
{
    if(!object)
        console.log("queryConvertArray must insert object")
    if(!key)
        console.log("queryConvertArray must insert key name")

    var arr =[]
    for(var i=0;i<object.length;i++)
    {
        arr.push(object[i][key])
    }

    return arr;
}

//convert JSON to single string array [{},{}]
//json = JSON input
//name = name from JSON 
convertJSONtoArray = function(json,name)
{
    var newArray=[]

    for (var i = 0; i < json.length; i++) {
        newArray.push(json[i][name])
    }

    return newArray
}

//arr1 is main array, filter missing element based on arr2
compareArray = function(arr1,arr2)
{
    if(!arr1)
        return arr2

    if(typeof arr1 !="object"|typeof arr2 !="object")
    {   console.log("compareArray => invalid array")
        return false
    }
    else{
        var result = arr1.filter(item=>arr2.indexOf(item)==-1);
        return result;
    }
}

//rearrange data
//data = return query
//model = sequlize model
//pkey = primary key to filter
//newAttribute = generate data to attribute.
combineColumn = function(data,model,pkey,newAttribute =null)
{
    let newJSON = []
    let JSONIdx = -1
    let cid

    for(var i=0;i<data.length;i++)
    {
      //create container
      let newObj ={}
      let includeObj ={}
  
      var cl = JSON.parse(JSON.stringify(data[i]))

      //detect new id 
      if(cid !=cl[pkey])
      {
        cid = cl[pkey]
        JSONIdx++

        newObj[newAttribute] =[]
        
        newJSON.push(newObj)
      }

      for (var key in cl) {
        if(key!==newAttribute)
        {
            //key put into outer list 
            if(model.attributes.hasOwnProperty(key))
            {
                newJSON[JSONIdx][key] = cl[key]
            }
            else
            {  //key put into inner list
                includeObj[key] = cl[key] 
            }
        }
         
      }

      newJSON[JSONIdx][newAttribute].push(includeObj)
    }


    return newJSON
}


convertUTC = function(date,hour)
{
    console.log(moment(date).subtract({'hours': hour}).toISOString())
    if(date)
    return moment(date).subtract({'hours': hour}).toISOString()
}