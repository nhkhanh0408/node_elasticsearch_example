var client = require('./client.js').client;
var mapping = require('./mapping');

client.indices.create({
    index: 'world',
    timeout: "5m"
}, function(err, resp, status) {
    if (err) {
        console.log(err);
    } else {
        console.log("created elasticsearch", resp);
        mapping.putMapping();
    }
});