var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var plugin = require('../app/plugin');
var pubsub = require('crane-gcp-pubsub');


describe('plugin', function() {
  
  it('should export constructor', function() {
    expect(plugin).to.be.an('object');
  });
  
  it('should be annotated', function() {
    expect(plugin['@implements']).to.equal('http://i.bixbyjs.org/ms/ProtocolPlugIn');
    expect(plugin['@protocol']).to.equal('https://pubsub.googleapis.com');
  });
  
  describe('PlugIn', function() {
    
    describe('.createConnection', function() {
      
      describe('with location as string', function() {
        var plugin, ConnectionSpy;
        ConnectionSpy = sinon.spy(pubsub.Connection);
        plugin = $require('../app/plugin',
          { 'crane-gcp-pubsub': { Connection: ConnectionSpy } });
        
        var connection = plugin.createConnection('https://pubsub.googleapis.com/v1/projects/example/topics/hello');
      
        it('should construct connection', function() {
          expect(ConnectionSpy).to.have.been.calledOnce;
          expect(ConnectionSpy).to.have.been.calledWithExactly({ projectId: 'example' });
        });
    
        it('should return connection', function() {
          expect(connection).to.be.an.instanceOf(pubsub.Connection);
        });
      });
      
      describe('with location as option', function() {
        var plugin, ConnectionSpy;
        ConnectionSpy = sinon.spy(pubsub.Connection);
        plugin = $require('../app/plugin',
          { 'crane-gcp-pubsub': { Connection: ConnectionSpy } });
        
        var connection = plugin.createConnection({ location: 'https://pubsub.googleapis.com/v1/projects/example/topics/hello' });
      
        it('should construct connection', function() {
          expect(ConnectionSpy).to.have.been.calledOnce;
          expect(ConnectionSpy).to.have.been.calledWithExactly({ projectId: 'example' });
        });
    
        it('should return connection', function() {
          expect(connection).to.be.an.instanceOf(pubsub.Connection);
        });
      });
      
      describe('with invalid protocol', function() {
        var connection = plugin.createConnection('http://pubsub.googleapis.com/v1/projects/example/topics/hello');
    
        it('should not return connection', function() {
          expect(connection).to.be.undefined;
        });
      });
      
      describe('with invalid host', function() {
        var connection = plugin.createConnection('https://pubsub.example.com/v1/projects/example/topics/hello');
    
        it('should not return connection', function() {
          expect(connection).to.be.undefined;
        });
      });
    
      describe('with invalid version', function() {
        var connection = plugin.createConnection('https://pubsub.googleapis.com/v0/projects/example/topics/hello');
    
        it('should not return connection', function() {
          expect(connection).to.be.undefined;
        });
      });
    
      describe('with invalid projects path', function() {
        var connection = plugin.createConnection('https://pubsub.googleapis.com/v1/invalids/example/topics/hello');
    
        it('should not return connection', function() {
          expect(connection).to.be.undefined;
        });
      });
      
    }); // .createConnection
    
    describe('.getName', function() {
      
      describe('with location as string', function() {
        var name = plugin.getName('https://pubsub.googleapis.com/v1/projects/example/topics/hello');
        
        it('should return name', function() {
          expect(name).to.equal('gcp.pubsub:example');
        });
      });
      
      describe('with location as option', function() {
        var name = plugin.getName({ location: 'https://pubsub.googleapis.com/v1/projects/example/topics/hello' });
        
        it('should return name', function() {
          expect(name).to.equal('gcp.pubsub:example');
        });
      });
      
      describe('with invalid protocol', function() {
        var name = plugin.getName('http://pubsub.googleapis.com/v1/projects/example/topics/hello');
    
        it('should not return name', function() {
          expect(name).to.be.undefined;
        });
      });
      
      describe('with invalid host', function() {
        var name = plugin.getName('https://pubsub.example.com/v1/projects/example/topics/hello');
    
        it('should not return name', function() {
          expect(name).to.be.undefined;
        });
      });
    
      describe('with invalid version', function() {
        var name = plugin.getName('https://pubsub.googleapis.com/v0/projects/example/topics/hello');
    
        it('should not return name', function() {
          expect(name).to.be.undefined;
        });
      });
    
      describe('with invalid projects path', function() {
        var name = plugin.getName('https://pubsub.googleapis.com/v1/invalids/example/topics/hello');
    
        it('should not return name', function() {
          expect(name).to.be.undefined;
        });
      });
      
    }); // .getName
    
  }); // PlugIn
  
});
