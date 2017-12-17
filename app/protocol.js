exports = module.exports = function(logger) {
  return require('../lib/protocol');
}

exports['@implements'] = 'http://i.bixbyjs.org/ms/protocol';
exports['@name'] = 'gcp.pubsub';
