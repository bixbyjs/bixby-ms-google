var uri = require('url');
var gcp = require('crane-google-cloud-pubsub');


exports.canHandle = function(options) {
  var url = uri.parse(options.url);
  if (url.host !== 'pubsub.googleapis.com') {
    return false;
  }
  
  var comps = url.pathname.split('/');
  var projectId = comps[3];
  var opts = {
    name: 'gcp-pubsub:' + projectId,
    options: {
      projectId: projectId
    }
  }
  return opts;
}

exports.create = function(options) {
  return new gcp.Connection(options);
}
