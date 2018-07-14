exports = module.exports = function() {
  var uri = require('url')
    , pubsub = require('crane-gcp-pubsub');
  
  
  return function createGoogleCloudPubSubConnection(options) {
    if (typeof options == 'string') {
      options = { url: options };
    }
    
    var url = uri.parse(options.url);
    if (url.protocol !== 'https:' || url.hostname !== 'pubsub.googleapis.com') { return; }
    
    var paths = url.pathname.split('/')
      , projectId;  
    if (paths[1] !== 'v1' || paths[2] !== 'projects') { return; }
    
    projectId = paths[3];
    return new pubsub.Connection({ projectId: projectId });
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/ms/createConnectionFunc';
exports['@protocol'] = 'https://pubsub.googleapis.com';
