const url = require('url')
const debug = require('debug')('httpParamHandler')

module.exports = function(req, res, next){

    const parsedUrl = url.parse(req.url)

    debug(parsedUrl)

    req._parsedUrl = parsedUrl;

    next();
}