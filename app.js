const express = require('express')
const bodyParser = require('body-parser')
const conf = require('./config')

const app = express();

require('./app/routes')(app, conf)

app.listen(conf.port, () => {
    console.log('listening on ' + conf.port)
})
