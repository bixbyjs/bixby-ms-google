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
    
    
    describe('processing a message', function() {
      var request, response;
      
      before(function() {
      });
    
      after(function() {
      });
      
      before(function(done) {
        var handler = factory(parse, errorLogging);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
            //req.body = {
            //  url: 'http://www.bar.com/'
            //}
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
      
      it('should respond', function() {
        expect(response.statusCode).to.equal(200);
        //expect(response.getHeader('Content-Type')).to.equal('application/xml')
        //expect(response.data).to.equal('<?xml version="1.0" encoding="utf-8"?>\n<response>\n  <error>0</error>\n</response>');
      });
    }); // processing a ping
    
  });
  
});
