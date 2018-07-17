exports = module.exports = function(app, parse) {
  
  
  function respond(req, res, next) {
    console.log('Google Cloud PubSub Push Delivery X');
    console.log(req.body);
    
    res.status(204).end();
  }
  
  return [
    parse('application/json'),
    respond
  ];
};

exports['@require'] = [
  'ms/service', // TODO: user an interface here....
  'http://i.bixbyjs.org/http/middleware/parse'
];
