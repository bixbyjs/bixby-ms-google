var uri = require('url');
var gcp = require('crane-gcp-pubsub');


exports.canHandle = function(options) {
  var url = uri.parse(options.url);
  if (url.host == 'pubsub.googleapis.com') {
    return true;
  }
  return false;
};

exports.createConnection = function(options, readyListener) {
  var url = uri.parse(options.url);
  var comps = url.pathname.split('/')
    , projectId, conn;
  
  projectId = comps[3];
  conn = new gcp.Connection({ projectId: projectId });
  conn.connect({}, readyListener);
  return conn;
};

exports.getName = function(options) {
  var url = uri.parse(options.url);
  var comps = url.pathname.split('/')
    , projectId;
  
  projectId = comps[3];
  return 'gcp.pubsub:' + projectId;
};

exports.parseTopic = function(url) {
  var url = uri.parse(url);
  var comps = url.pathname.split('/')
    , topic;
  
  topic = comps[5];
  return topic;
};
