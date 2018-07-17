exports = module.exports = function(pushHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.post('/', pushHandler);
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.modulate.io/js/cloud/gcp/pubsub/HTTPPushDeliveryService'
];
exports['@require'] = [
  './handlers/push'
];
