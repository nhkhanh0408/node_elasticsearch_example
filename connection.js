var mysql = require('mysql');
var express = require('express');
var util = require('./util/util');

var connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'hoakhanh',
    database: 'world'
});

var executeQuery, updateData;

executeQuery = function(query, params, callback) {
    connectionPool.getConnection(function(err, connection) {
        if (err) {
            util.handleConsole('Err connecting to Db', err);
            callback(err, null);
        }

        var executeLog = connection.query(
            query, params,
            function(err, result) {
                if (err) {
                    util.handleConsole('Err connecting to Db', err);
                    callback(err, null);
                } else {
                    util.handleConsole('query data', result);
                    callback(null, result);
                }

                connection.release();
            });

        util.handleConsole("query execute log", executeLog.sql);
    });
}

/* var argumentsCollection = {
    "tableName"    : ""
, "tableData"    : {}
, "filter"       : ""
, "filterParams" : []
}*/
updateData = function(argumentsCollection, callback) {
    util.handleConsole("update data argumentsCollection", argumentsCollection);

    connectionPool.getConnection(function(err, connection) {
        if (err) {
            util.handleConsole('Err connecting to Db', err);
            callback(err, null);
        }

        var query = "";
        var columnsList = [];
        var updateFields = "";
        var params = [];

        for (var key in argumentsCollection.tableData) {
            columnsList.push(key);
        }

        for (var i = columnsList.length - 1; i >= 0; i--) {
            if (i == 0) {
                updateFields += columnsList[i] + " = ? ";
            } else {
                updateFields += columnsList[i] + " = ?, ";
            }

            params.push(argumentsCollection.tableData[columnsList[i]]);
        }

        if (argumentsCollection.tableName != "user") {
            updateFields += ",modified_time = NOW() ";
        }


        query = "UPDATE " + argumentsCollection.tableName +
            " SET " + updateFields +
            " WHERE " + argumentsCollection.filter;

        var executeLog = connection.query(
            query, params.concat(argumentsCollection.filterParams),
            function(err, result) {
                if (err) {
                    util.handleConsole('Err connecting to Db', err);
                    callback(err, null);
                } else {
                    callback(null, result);
                }

                connection.release();
            });

        util.handleConsole("query execute log", executeLog.sql);
    });
}

/* var argumentsCollection = {
    "tableName" : ""
, "tableData" : {}
}*/
insertData = function(argumentsCollection, callback) {
    util.handleConsole("insert data argumentsCollection", argumentsCollection);

    connectionPool.getConnection(function(err, connection) {
        if (err) {
            util.handleConsole('Err connecting to Db', err);
            callback(err, null);
        }

        var query = "";
        var columnsList = "";
        var insertFields = "";
        var params = [];

        for (var key in argumentsCollection.tableData) {
            columnsList += key + ",";
            insertFields += "?,";
            params.push(argumentsCollection.tableData[key]);
        }

        columnsList += "created_time,modified_time";
        insertFields += "NOW(),NOW()";

        query = "INSERT INTO " + argumentsCollection.tableName +
            "(" + columnsList + ")" +
            " VALUES (" + insertFields + ")";

        var executeLog = connection.query(
            query, params.concat(argumentsCollection.filterParams),
            function(err, result) {
                if (err) {
                    util.handleConsole('Err connecting to Db', err);
                    callback(err, null);
                } else {
                    callback(null, result);
                }

                connection.release();
            });

        util.handleConsole("query execute log", executeLog.sql);
    });
}

module.exports.executeQuery = executeQuery;
module.exports.updateData = updateData;
module.exports.insertData = insertData;