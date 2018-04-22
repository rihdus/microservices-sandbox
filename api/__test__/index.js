const assert = require('assert');
const http = require('http')
const Server = require('../server')

const testPort = 3200

describe("Server", function () {

   let server;

   beforeEach(function () {
      server = new Server({port: testPort})
   })

   it('server instance setup should start and stop successfully', function (done) {
      server.listen(function (err) {
         assert.equal(typeof err, 'undefined', 'Should start successfully')
         try {
            server.close(function (err) {
               assert.equal(typeof err, 'undefined', 'Should stop successfully')
               done()
            })
         } catch (e) {
            done()
         }
      })
   })

   it('server should respond to simple get request', function (done) {
      server.listen(function () {
         http.get('http://localhost:' + testPort, function (res) {
            const statusCode = res.statusCode
            assert.equal(statusCode, 200, 'expecting 20 ok response')
            server.close(function () {
               done()
            })
         })
      })
   })
})
