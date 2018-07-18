/* global describe, it */

var expect = require('chai').expect;


describe('@modulate/bixby-ms-gcp', function() {
  
  describe('package.json', function() {
    var json = require('../package.json');
    
    it('should have assembly metadata', function() {
      expect(json.assembly.namespace).to.equal('io.modulate/cloud/gcp/pubsub');
      
      expect(json.assembly.components).to.have.length(3);
      expect(json.assembly.components).to.include('msprotocolplugin');
      expect(json.assembly.components).to.include('app/brokerprovider');
      expect(json.assembly.components).to.include('http/push/service');
    });
  });
  
  it('should throw if required', function() {
    expect(function() {
      var pkg = require('..');
    }).to.throw(Error).with.property('code', 'MODULE_NOT_FOUND');
  });
  
});
