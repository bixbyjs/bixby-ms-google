var uri = require('url');
var gcp = require('crane-google-cloud-pubsub');


exports.canHandle = function(options) {
  var url = uri.parse(options.url);
  if (url.host !== 'pubsub.googleapis.com') {
    return false;
  }
  
  var comps = url.pathname.split('/');
  var projectId = comps[3];
  var topic = comps[5];
  var ctx = {
    name: 'gcp.pubsub:' + projectId,
    topic: topic,
    options: {
      projectId: projectId
    }
  }
  return ctx;
};

exports.create = function(options) {
  return new gcp.Connection(options);
};
