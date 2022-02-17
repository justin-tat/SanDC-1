const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = require('./index.js');




describe('GET /', function() {
  it('responds with 200', function(done) {
    request(app)
    .get('/')
    .expect(200, done);
  });
});



describe('GET /fec2/hr-rpp/reviews/42', function() {
  this.timeout(15000);

  it('responds with 200',  function(done) {
  request(app)
    .get('/fec2/hr-rpp/reviews/42')
    .expect(200, done);
  });
});



