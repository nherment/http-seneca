
var seneca = require('seneca')()
var salestax = require('seneca-salestax')

var Hapi = require('hapi')
var server = Hapi.createServer('localhost', 3000)

seneca.use(salestax, {
  country: {
    FR: 0.2,
    IE: 0.23,
    USA: {
     '*': 0,
     state: {
       AL: 0.04,
       AK: 0,
       AZ: 0.56,
       CA: 0.0875
     }
    }
  }
})

seneca.use('seneca-hapi')


seneca.ready(function() {

  var hapiPin = seneca.pin({role: 'hapi', cmd:'*'})

  hapiPin.attach({
    name: 'salestax1',
    version: '0.0.1',
    pack: server.pack,
    connectors: [
      {
        'method': 'get',
        'path': '/{cmd}/{country}/{state}/{net}',
        'role': 'salestax'
      },
      {
        'method': 'post',
        'path': '/{cmd}/{country}/{state}/{net}',
        'role': 'salestax'
      },
      {
        'method': 'get',
        'path': '/{cmd}/{country}/{state}',
        'role': 'salestax'
      },
      {
        'method': 'post',
        'path': '/{cmd}/{country}/{state}',
        'role': 'salestax'
      },
      {
        'method': 'get',
        'path': '/{cmd}/{country}',
        'role': 'salestax'
      },
      {
        'method': 'post',
        'path': '/{cmd}/{country}',
        'role': 'salestax'
      }
    ]}, function(err) {
      server.start()
    })

})
