exports = module.exports = function(parse) {
  
  
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
  'http://i.bixbyjs.org/http/middleware/parse'
];
