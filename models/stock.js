'use strict';
const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {

  var stock = sequelize.define('stock', {
    stock_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    stock_name: DataTypes.STRING,
    stock_code: DataTypes.STRING,
    stock_type: DataTypes.STRING,
    stock_amount: DataTypes.INTEGER,
    stock_description: DataTypes.STRING,
    stock_weight: DataTypes.INTEGER,
    arrival_time: DataTypes.DATE,
    export_time: DataTypes.DATE,
  }, {
    freezeTableName: false,
    tableName: 'stock',
    timestamps: false,
    getterMethods: {
      // profile_url: function () {

      //   if (this.getDataValue('profile_pic') != null)
      //     return CONFIG.filePath + 'profile/' + this.getDataValue('profile_pic');
      //   else
      //     return CONFIG.filePath + 'profile/default-user.png';

      // },
      last_login: function () {
        if (this.getDataValue('last_login'))
          return moment(this.getDataValue('last_login'), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        else if (this.getDataValue('last_login') === undefined)
          return;
        else
          return null;
      },
      createdAt: function () {
        if (this.getDataValue('createdAt'))
          return moment(this.getDataValue('createdAt'), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        else if (this.getDataValue('createdAt') === undefined)
          return;
        else
          return null;
      },
      updatedAt: function () {
        if (this.getDataValue('updatedAt'))
          return moment(this.getDataValue('updatedAt'), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        else if (this.getDataValue('updatedAt') === undefined)
          return;
        else
          return null;
      },
    },
  });

  return stock;
};