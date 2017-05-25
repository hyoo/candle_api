const fs = require('fs-extra')

const models = {}

fs.readdirSync(__dirname).filter(filename => {
    return filename.match('.js$') && (filename !== 'index.js')
}).forEach(filename => {
    const name = filename.replace('.js', '')
    const media = require('./' + name)
    models[media.contentType] = media.formatter
})

module.exports = models;