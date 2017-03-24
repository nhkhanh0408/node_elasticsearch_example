var client = require('./client.js').client;

var putMapping = function() {
    client.indices.putMapping({
        index: 'world',
        type: 'country',
        body: {
            properties: {
                'id': {
                    'type': 'text'
                }
            }
        }
    }, function(err, resp, status) {
        if (err) {
            console.log(err);
        } else {
            console.log(resp);
        }
    });
}

module.exports.putMapping = putMapping;