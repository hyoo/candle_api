module.exports = {
    port: 3301,
    solr: {
        url: "http://localhost:8983/solr/",
        cores: [
            "benchmark", "experiment", "run"
        ],
    }
}