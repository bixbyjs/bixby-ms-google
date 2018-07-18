exports = module.exports = function(ms) {
  
  
  return function() {
    var url = 'https://pubsub.googleapis.com/v1/projects/' + process.env['GOOGLE_CLOUD_PROJECT'];
    
    var broker = ms.createConnection(url);
    broker.on('ready', function() {
      broker.subscribe('my-sub-linkback');
    });
    
    return broker;
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/ms/app/BrokerProvider';
exports['@name'] = 'cloud.google.com';
exports['@require'] = [
  'http://i.bixbyjs.org/ms'
];
