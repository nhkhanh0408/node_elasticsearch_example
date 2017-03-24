var elasticsearch = require("./client.js");
var connection = require("../connection");
var client = elasticsearch.client;

var indexAllObjects, indexCountry, _rebuildCountryIndexsHandler, _deleteOldIndexs;

indexCountry = function() {
    var selectFields = [
        "Country.Code", "Country.Name"
    ]
    var query = "SELECT " + selectFields.toString() +
        " FROM Country GROUP BY Country.Code"

    connection.executeQuery(query, [], function(err, data) {
        if (err) {
            console.log("error: ");
            console.log(err);
        } else {
            _deleteOldIndexs();
            _rebuildCountryIndexsHandler(data);
        }
    });
}

_rebuildCountryIndexsHandler = function(data) {
    var inputData = data;
    var bulk = [];

    var makeBulk = function(CountryList, callback) {
        for (var current in CountryList) {
            bulk.push({ index: { _index: 'world', _type: 'country', _id: CountryList[current].id } }, {
                'code': CountryList[current].Code,
                'name': CountryList[current].Name
            });
        }

        callback(bulk);
    }

    var indexAllData = function(madebulk, callback) {
        client.bulk({
            maxRetries: 1,
            index: 'world',
            type: 'country',
            body: madebulk,
            timeout: '5m'
        }, function(err, resp, status) {
            if (err) {
                console.log(err);
            } else {
                callback(resp.items);
            }
        })
    }

    makeBulk(inputData, function(response) {
        console.log("Bulk content prepared");

        indexAllData(response, function(response) {
            console.log(response);
        })
    });
}

_deleteOldIndexs = function() {
    client.deleteByQuery({
        index: 'world',
        body: {
            query: {
                match_all: {}
            }
        },
        timeout: "5m"
    }, function(err, resp, status) {
        console.log(resp);
    });
}

indexAllObjects = function() {
    indexCountry();
}

module.exports.indexAllObjects = indexAllObjects;