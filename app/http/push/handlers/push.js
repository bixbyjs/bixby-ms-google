exports = module.exports = function(app, parse) {
  var Message = require('../../../../lib/http/message');
  
  
  function handle(req, res, next) {
    var data = Buffer.from(req.body.message.data, 'base64')
    
    
    console.log(req.headers);
    
    function done(ok) {
      console.log('done: ' + ok);
      if (!ok) { return res.status(500).end(); }
      return res.status(204).end();
    }
    
    var msg = new Message('test-linkback', data, done);
    console.log('dispatching app...');
    app(msg);
  }
  
  return [
    parse('application/json'),
    handle
  ];
};

exports['@require'] = [
  'ms/service', // TODO: user an interface here....
  'http://i.bixbyjs.org/http/middleware/parse'
];
