var client = require('./client.js').client;

client.indices.delete({ index: 'world' }, function(err, resp, status) {
    console.log("delete", resp);
});