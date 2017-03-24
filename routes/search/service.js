var util = require('../../util/util');

var ESClient = require("../../elasticsearch/client.js").client;

var search = function(req, res, args) {
    var query = {
        bool: {
            must: {
                match_all: {}
            },
            filter: []
        }
    };

    var sort = [];

    if (args.q.length) {
        query.bool.must = {
            multi_match: {
                query: args.q,
                fields: ["code", "name"]
            }
        };
    }

    console.log(query);

    ESClient.search({
        index: 'world',
        type: args.type,
        body: {
            query: query,
            sort: sort
        }
    }, function(error, response, status) {
        if (error) {
            util.renderData({ result: false, error: error }, res);
        } else {
            var data = [];

            response.hits.hits.forEach(function(hit) {
                var _source = hit._source;

                data.push(_source);
            })

            util.renderData({ result: true, data: data }, res);
        }
    });
}

module.exports.search = search;