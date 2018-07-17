/* global describe, it, expect */

var expect = require('chai').expect;
var factory = require('../../../app/http/push/service');


describe('http/push/service', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal([
      'http://i.bixbyjs.org/http/Service',
      'http://schemas.modulate.io/js/cloud/gcp/pubsub/HTTPPushDeliveryService'
    ]);
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('create', function() {
    function pushHandler() {};
    
    var service = factory(pushHandler);
  
    it('should construct handler', function() {
      expect(service).to.be.a('function');
      expect(service.length).to.equal(3);
    });
  });
  
});
