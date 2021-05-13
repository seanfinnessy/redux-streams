const NodeMediaServer = require('node-media-server');

// rtmp server makes video available for consumption on port 8000. on port 1935 is where someone will send streaming video to.
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config)
nms.run();