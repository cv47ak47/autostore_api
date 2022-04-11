'use strict';
const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {

    var stock_bin = sequelize.define('stock_bin', {
        stock_bin_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        stock_id: DataTypes.INTEGER,
        storage_id: DataTypes.INTEGER,
        stock_bin_code: DataTypes.STRING,
    }, {
        tableName: 'stock_bin',
        timestamps: false,
        // getterMethods: {
        //     createdAt: function () {
        //         if (this.getDataValue('createdAt'))
        //             return moment(this.getDataValue('createdAt'), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        //         else if (this.getDataValue('createdAt') === undefined)
        //             return;
        //         else
        //             return null;
        //     },
        //     updatedAt: function () {
        //         if (this.getDataValue('updatedAt'))
        //             return moment(this.getDataValue('updatedAt'), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        //         else if (this.getDataValue('updatedAt') === undefined)
        //             return;
        //         else
        //             return null;
        //     },
        // },
    });
    return stock_bin;
};