var express = require('express');

var searchService = require('./service');

var router = express.Router();

/*
 * POST to search stores by lat and lng.
 */
router.post('/', function(req, res) {
    var searchInfo = req.body.requestmsg.searchInfo;
    var q = searchInfo.q === undefined ? "" : searchInfo.q;

    var args = {
        q: q,
        type: ["country"]
    }

    searchService.search(req, res, args);
});

module.exports = router;