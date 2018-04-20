const http = require('http')

const requestHandler = function (request, response) {
   response.end('Hello')
}

function Server(config) {
   this.server = http.createServer(requestHandler)
   this.port = config.port;
}

Server.prototype.listen = function (cb) {
   const self = this;
   this.server.listen(self.port, function (err) {
      cb && cb(err);
   })
   return this;
}

Server.prototype.close = function (cb) {
   const self = this;
   this.server.close(function (err) {
      cb && cb(err)
      return self;
   })

}

module.exports = Server;