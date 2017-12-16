exports = module.exports = function(logger) {
  console.log('GCP BROKER!');
}

exports['@implements'] = [
  'http://i.bixbyjs.org/opt/gcp/pubsub/Broker'
];
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/Logger'
];
