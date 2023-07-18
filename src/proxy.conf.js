const PROXY_CONFIG = [
    {
        "context": [
            "/api",
            "/neomsense",
        ],
        "target":   "https://55c8-103-250-151-79.ngrok-free.app/", // "https://iotsenseuat.oci.sense.neomos.online/",
        "secure": false,
        "changeOrigin": true
    }];
module.exports = PROXY_CONFIG;