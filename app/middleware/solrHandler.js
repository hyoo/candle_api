const promise = require('bluebird')
const request = require('request')
const config = require('../../config')
const debug = require('debug')('solrHandler')

const query = (url, query, options) => {
    return new promise((resolve, reject) => {
        request({
            url: url + '/select',
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: query + '&wt=json',
            json: true
        }, function(error, response, body){
            if(error){
                reject(error)
                return
            }
            resolve(body)
        })
    })
}

const get = (url, rawId, option) => {

    const id = rawId.includes(',') ? rawId.split(',') : rawId;
    const hasMultipleIds = (id instanceof Array && id.length > 1);
    const idField = hasMultipleIds ? "ids" : "id"
    const idValue = hasMultipleIds ? id.map(encodeURIComponent).join(',') : encodeURIComponent(id);

    return new promise((resolve, reject) => {
        request({
            url: url + '/get?' + idField + '=' + idValue,
            method: 'GET',
            headers: {
                accept: 'application/json'
            },
            json: true
        }, function(error, respose, body){
            if(error){
                reject(error)
                return
            }
            resolve(body)
        })
    })
}

module.exports = function(req, res, next){
    const baseUrl = config.solr.url

    debug("solrHandler.", req.query)

    switch(req.query.method){
        case "query":
            query(baseUrl + req.query.collection, req.query.query)
            .then(results => {
                res.results = results;
                next();
            })
            .catch(error => {
                res.status(500).send(error.message)
            })
            break;
        case "get":
            get(baseUrl + req.query.collection, req.query.query)
            .then(result => {
                res.results = result;
                next();
            })
            .catch(error => {
                res.status(500).send(error.message)
            })
            break;
    }
}