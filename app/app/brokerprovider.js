exports = module.exports = function(ms, logger) {
  
  
  return function() {
    var url = 'https://pubsub.googleapis.com/v1/projects/' + process.env['GOOGLE_CLOUD_PROJECT'];
    
    var broker = ms.createConnection(url);
    broker.on('ready', function() {
      broker.consume('my-sub-linkback', function(err) {
        if (err) {
          logger.error('Failed to consume message queue')
          logger.error(err.stack);
        }
      });
    });
    return broker;
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/ms/app/BrokerProvider';
exports['@name'] = 'cloud.google.com';
exports['@require'] = [
  'http://i.bixbyjs.org/ms',
  'http://i.bixbyjs.org/Logger'
];
