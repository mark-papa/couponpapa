'use strict'

const request = require('request')
const when = require('when')

const prepare = (callback) => {
  const deferred = when.defer()
  if (typeof (callback) === 'function') {
    return {
      callback: function (error, res, body) {
        if (res.statusCode >= 400) {
          return callback(body.error.message);
        }
        return callback(null, body);
      }
    }
  } else {
    return {
      promise: deferred.promise,
      callback: function (error, res, body) {
        if (res.statusCode >= 400) {
          return deferred.reject(body.error.message);
        }
        return deferred.resolve(body);
      }
    }
  }
}

module.exports = class Client {
  constructor (apiKey, host) {
    this.host = host || 'https://sandbox.couponpapa.io',
    this.headers = {
      'X-Access-Token': apiKey,
    }
  }

  check (code, trackingId, amount, callback) {
    const handler = prepare(callback);
    request.get({
      url: this.host + '/api/codes/' + encodeURIComponent(code) + '/check',
      headers: this.headers,
      json: true,
      body: {
        trackingId: trackingId,
        totalAmount: amount,
      }
    }, handler.callback);
    return handler.promise;
  }

  use (code, trackingId, amount, callback) {
    const handler = prepare(callback);
    request.post({
      url: this.host + '/api/codes/' + encodeURIComponent(code) + '/use',
      headers: this.headers,
      json: true,
      body: {
        trackingId: trackingId,
        totalAmount: amount,
      }
    }, handler.callback);
    return handler.promise;
  }

  repurchase (trackingId, amount, callback) {
    const handler = prepare(callback);
    request.post({
      url: this.host + '/api/analytics/repurchase/',
      headers: this.headers,
      json: true,
      body: {
        trackingId: trackingId,
        totalAmount: amount,
      }
    }, handler.callback);
    return handler.promise;
  }

  addToCouponBox (trackingId, couponSequence, callback) {
    const handler = prepare(callback);
    request.post({
      url: this.host + '/api/couponboxes/add/',
      headers: this.headers,
      json: true,
      body: {
        trackingId: trackingId,
        couponSequence: couponSequence,
      }
    }, handler.callback);
    return handler.promise;
  }
}
