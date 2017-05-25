module.exports = {
    contentType: 'application/solr+json',
    formatter: function(req, res, next){
        res.send(JSON.stringify(res.results))
        res.end()
    }
}