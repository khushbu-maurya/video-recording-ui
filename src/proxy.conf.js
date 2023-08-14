    const PROXY_CONFIG = [
    {
        "context": [
            "/api",
            "/neomsense",
        ],
        "target":   "http://62.72.13.210:5001/", // "https://iotsenseuat.oci.sense.neomos.online/",
        "secure": false,
        "changeOrigin": true
    }];
module.exports = PROXY_CONFIG;
  