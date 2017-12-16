exports = module.exports = function(logger) {
  var gcp = require('crane-google-cloud-pubsub');
  
  var broker = new gcp.Broker();
  return broker;
}

exports['@implements'] = [
  //'http://i.bixbyjs.org/ms/Broker',
  'http://i.bixbyjs.org/ms/opt/gcp/pubsub/Broker'
];
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/Logger'
];
