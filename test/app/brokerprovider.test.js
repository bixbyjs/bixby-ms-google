/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/app/brokerprovider');
var EventEmitter = require('events').EventEmitter;


describe('app/brokerprovider', function() {
  var GOOGLE_CLOUD_PROJECT = process.env['GOOGLE_CLOUD_PROJECT'];
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal('http://i.bixbyjs.org/ms/app/BrokerProvider');
    expect(factory['@name']).to.deep.equal('cloud.google.com');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('BrokerProvider', function() {
    var ms = {
      createConnection: function(){}
    }
    
    
    describe('default behavior', function() {
      var connectionObj = new EventEmitter();
      connectionObj.subscribe = function() {};
      
      before(function() {
        process.env['GOOGLE_CLOUD_PROJECT'] = 'example';
      });
    
      after(function() {
        process.env['GOOGLE_CLOUD_PROJECT'] = GOOGLE_CLOUD_PROJECT;
      });
      
      before(function() {
        sinon.stub(ms, 'createConnection').returns(connectionObj);
      });
    
      after(function() {
        ms.createConnection.restore();
      });
      
      var broker;
      before(function() {
        broker = factory(ms)();
      })
      
      it('should create broker', function() {
        expect(ms.createConnection.callCount).to.equal(1);
        expect(ms.createConnection.args[0][0]).to.equal('https://pubsub.googleapis.com/v1/projects/example');
      });
      
      describe('on ready', function() {
        before(function() {
          sinon.stub(connectionObj, 'subscribe').returns();
        });
        
        after(function() {
          connectionObj.subscribe.restore();
        });
        
        
        before(function(done) {
          connectionObj.emit('ready');
          process.nextTick(done);
        });
        
        it('should subscribe', function() {
          expect(connectionObj.subscribe.callCount).to.equal(1);
          expect(connectionObj.subscribe.args[0][0]).to.equal('my-sub-linkback');
        });
      }); // on ready
      
    }); // default behavior
    
  }); // BrokerProvider
  
});
