/* global describe, it, expect */

var expect = require('chai').expect;
var factory = require('../../app/app/brokerprovider');


describe('app/brokerprovider', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal('http://i.bixbyjs.org/ms/app/BrokerProvider');
    expect(factory['@name']).to.deep.equal('cloud.google.com');
    expect(factory['@singleton']).to.be.undefined;
  });
  
});
