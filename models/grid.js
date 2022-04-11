'use strict';
const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {

  var grid = sequelize.define('grid', {
    grid_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    grid_depth: DataTypes.INTEGER,
    grid_length: DataTypes.INTEGER,
    grid_width: DataTypes.INTEGER,
    input_port_location: DataTypes.INTEGER,
    output_port_location: DataTypes.INTEGER,
    supervisor_id: DataTypes.INTEGER,
  }, {
    freezeTableName: false,
    tableName: 'grid',
    timestamps: false,
    // getterMethods: {
    //   profile_url: function () {

    //     if (this.getDataValue('profile_pic') != null)
    //       return CONFIG.filePath + 'profile/' + this.getDataValue('profile_pic');
    //     else
    //       return CONFIG.filePath + 'profile/default-user.png';

    //   },
    //   last_login: function () {
    //     if (this.getDataValue('last_login'))
    //       return moment(this.getDataValue('last_login'), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
    //     else if (this.getDataValue('last_login') === undefined)
    //       return;
    //     else
    //       return null;
    //   },
    //   createdAt: function () {
    //     if (this.getDataValue('createdAt'))
    //       return moment(this.getDataValue('createdAt'), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
    //     else if (this.getDataValue('createdAt') === undefined)
    //       return;
    //     else
    //       return null;
    //   },
    //   updatedAt: function () {
    //     if (this.getDataValue('updatedAt'))
    //       return moment(this.getDataValue('updatedAt'), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
    //     else if (this.getDataValue('updatedAt') === undefined)
    //       return;
    //     else
    //       return null;
    //   },
    // },
  });

  return grid;
};