const solrHandler = require('../middleware/solrHandler')
const httpParamHandler = require('../middleware/httpParamHandler')
const mediaHandler = require('../media')
const debug = require('debug')('dataTypeRoutes')


module.exports = function(app, conf){
    
    app.use(httpParamHandler)

    app.get('/:collection/:id', (req, res, next) => {
        
        req.query = { method: 'get',
            collection: req.params.collection,
            query: req.params.id
        }

        next();
    })

    app.get('/:collection/', (req, res, next) => {

        req.query = { method: 'query',
            collection: req.params.collection,
            query: req._parsedUrl.query
        }

        next();
    })

    app.use([
        solrHandler,
        function(req, res, next){
            res.format(mediaHandler)
        }
    ])
}