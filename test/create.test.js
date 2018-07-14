var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../app/create');
var pubsub = require('crane-gcp-pubsub');


describe('app/create', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@singleton']).to.be.undefined;
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/ms/createConnectionFunc');
    expect(factory['@protocol']).to.equal('https://pubsub.googleapis.com');
  });
  
  describe('create', function() {
    
    describe('with location as string', function() {
      var ConnectionSpy = sinon.spy(pubsub.Connection);
      
      
      var factory = $require('../app/create',
        { 'crane-gcp-pubsub': { Connection: ConnectionSpy } });
      var connection = factory()('https://pubsub.googleapis.com/v1/projects/example/topics/hello');
      
      it('should construct connection', function() {
        expect(ConnectionSpy).to.have.been.calledOnce;
        expect(ConnectionSpy).to.have.been.calledWithExactly({ projectId: 'example' });
      });
    
      it('should return connection', function() {
        expect(connection).to.be.an.instanceOf(pubsub.Connection);
      });
    });
    
    describe('with invalid protocol', function() {
      var connection = factory()('http://pubsub.googleapis.com/v1/projects/example/topics/hello');
    
      it('should not return connection', function() {
        expect(connection).to.be.undefined;
      });
    });
    
    describe('with invalid host', function() {
      var connection = factory()('https://pubsub.example.com/v1/projects/example/topics/hello');
    
      it('should not return connection', function() {
        expect(connection).to.be.undefined;
      });
    });
    
    describe('with invalid version', function() {
      var connection = factory()('https://pubsub.googleapis.com/v0/projects/example/topics/hello');
    
      it('should not return connection', function() {
        expect(connection).to.be.undefined;
      });
    });
    
    describe('with invalid projects path', function() {
      var connection = factory()('https://pubsub.googleapis.com/v1/invalids/example/topics/hello');
    
      it('should not return connection', function() {
        expect(connection).to.be.undefined;
      });
    });
    
  }); // creating scheme
  
});
