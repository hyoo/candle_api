const dataTypeRoutes = require('./dataTypeRoutes')
const debug = require('debug')('routes')

module.exports = function(app, conf) {

    const allowedCollections = conf.solr.cores

    app.param('dataType', (req, res, next, dataType) => {
        debug("checking data type:", dataType)
        if(allowedCollections.includes(dataType)){
            next();
            return;
        }

        res.status(404)
        res.end()
        next(new Error('No endpoint found: ' + dataType))

    })
    // app.use('/:dataType/', (req, res, next) => {
        dataTypeRoutes(app, conf);
        // next();
    // })
}