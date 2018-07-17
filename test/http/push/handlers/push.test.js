/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/http/push/handlers/push');


describe('http/push/handlers/push', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    function parse(type) {
      return function(req, res, next) {
        req.__ = req.__ || {};
        req.__.supportedMediaType = type;
        next();
      };
    }
    
    function authenticate(method) {
      return function(req, res, next) {
        req.authInfo = { method: method };
        next();
      };
    }
    
    function errorLogging() {
      return function(err, req, res, next) {
        req.__ = req.__ || {};
        req.__.log = req.__.log || [];
        req.__.log.push(err.message);
        next(err);
      }
    }
    
    
    describe('acking a message', function() {
      function app(msg) {
        msg.ack();
      }
      var appSpy = sinon.spy(app);
      
      var request, response;
      before(function(done) {
        var handler = factory(appSpy, parse, errorLogging);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
            req.body = {
              message: {
                attributes: {
                  "key": "value"
                },
                data: "SGVsbG8gQ2xvdWQgUHViL1N1YiEgSGVyZSBpcyBteSBtZXNzYWdlIQ==",
                message_id: "136969346945"
              },
              subscription: "projects/myproject/subscriptions/mysubscription"
            }
          })
          .res(function(res) {
            response = res;
          })
          .end(function() {
            done();
          })
          .dispatch();
      });
      
      it('should parse request body', function() {
        expect(request.__.supportedMediaType).to.equal('application/json');
      });
      
      it('should dispatch message', function() {
        expect(appSpy.callCount).to.equal(1);
        var msg = appSpy.args[0][0];
        expect(msg.topic).to.equal('test-linkback');
        expect(msg.data).to.deep.equal(Buffer.from('Hello Cloud Pub/Sub! Here is my message!'));
      });
      
      it('should respond', function() {
        expect(response.statusCode).to.equal(204);
        expect(response.data).to.equal(undefined);
      });
    }); // acking a message
    
    describe('nacking a message', function() {
      function app(msg) {
        msg.nack();
      }
      var appSpy = sinon.spy(app);
      
      var request, response;
      before(function(done) {
        var handler = factory(appSpy, parse, errorLogging);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
            req.body = {
              message: {
                attributes: {
                  "key": "value"
                },
                data: "SGVsbG8gQ2xvdWQgUHViL1N1YiEgSGVyZSBpcyBteSBtZXNzYWdlIQ==",
                message_id: "136969346945"
              },
              subscription: "projects/myproject/subscriptions/mysubscription"
            }
          })
          .res(function(res) {
            response = res;
          })
          .end(function() {
            done();
          })
          .dispatch();
      });
      
      it('should parse request body', function() {
        expect(request.__.supportedMediaType).to.equal('application/json');
      });
      
      it('should dispatch message', function() {
        expect(appSpy.callCount).to.equal(1);
        var msg = appSpy.args[0][0];
        expect(msg.topic).to.equal('test-linkback');
        expect(msg.data).to.deep.equal(Buffer.from('Hello Cloud Pub/Sub! Here is my message!'));
      });
      
      it('should respond', function() {
        expect(response.statusCode).to.equal(500);
        expect(response.data).to.equal(undefined);
      });
    }); // nacking a message
    
  });
  
});
