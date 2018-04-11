const setup = require('proxy');
const http = require('http')

module.exports = {
  start(port) {
    let server = setup(http.createServer());
    server.listen(port, function () {
      var port = server.address().port;
      console.log('HTTP(s) proxy server listening on port %d', port);
    })
  }
}