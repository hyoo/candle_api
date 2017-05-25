module.exports = {
    contentType: 'application/json',
    formatter: function(req, res, next){

        switch(req.query.method){
            case "query":
                if (res.results && res.results.response && res.results.response.docs){
                    res.send(JSON.stringify(res.results.response.docs))
                } else {
                    res.status(404)
                }
                res.end()
                break;
            case "get":
                if (res.results && res.results.response && res.results.response.docs){
                    res.send(JSON.stringify(res.results.response.docs))
                } else if (res.results instanceof Object){
                    res.send(JSON.stringify(res.results.doc))
                } else {
                    res.status(404)
                }
                res.end()
                break;
        }
    }
}