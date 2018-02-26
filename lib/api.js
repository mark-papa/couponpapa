'use strict'

const request = require('request')
const when = require('when')

const prepare = (callback) => {
  const deferred = when.defer()
  if (typeof (callback) === 'function') {
    return {
      callback: function (error, res, body) {
        if (body.error && body.error.statusCode >= 400) {
          return callback(body.error.message);
        }
        return callback(null, body);
      }
    }
  } else {
    return {
      promise: deferred.promise,
      callback: function (error, res, body) {
        if (body.error && body.error.statusCode >= 400) {
          return deferred.reject(body.error.message);
        }
        return deferred.resolve(body);
      }
    }
  }
}

module.exports = class Couponpapa {
  constructor (apiKey, mode) {
    this.host = (mode === 'sandbox') ? 'https://sandbox.couponpapa.io' : 'https://service.couponpapa.io',
    this.headers = {
      'X-Access-Token': apiKey,
      'content-type': 'application/json',
    }
  }

  // codes
  codesCheck (code, trackingId, totalAmount, callback) {
    const handler = prepare(callback);
    request.get({
      url: this.host + '/api/v1/codes/' + encodeURIComponent(code) + '/check',
      headers: this.headers,
      json: true,
      body: {
        trackingId: trackingId,
        totalAmount: totalAmount,
      }
    }, handler.callback);
    return handler.promise;
  }

  codesUse (code, trackingId, totalAmount, orderId, callback) {
    const handler = prepare(callback);
    request.post({
      url: this.host + '/api/v1/codes/' + encodeURIComponent(code) + '/use',
      headers: this.headers,
      json: true,
      body: {
        trackingId: trackingId,
        totalAmount: totalAmount,
        orderId: orderId.toString(),
      }
    }, handler.callback);
    return handler.promise;
  }

  codesCancel (orderId, callback) {
    const handler = prepare(callback);
    request.post({
      url: this.host + '/api/v1/codes/cancel',
      headers: this.headers,
      json: true,
      body: {
        orderId: orderId.toString(),
      }
    }, handler.callback);
    return handler.promise;
  }

  codesFire (tag, recipient, callback) {
    const handler = prepare(callback);
    request.post({
      url: this.host + '/api/v1/codes/fire',
      headers: this.headers,
      json: true,
      body: {
        tag: tag,
        recipient: recipient,
      }
    }, handler.callback);
    return handler.promise;
  }

  // couponboxes
  couponboxesList (trackingId, totalAmount, callback) {
    const handler = prepare(callback);
    request.get({
      url: this.host + '/api/v1/couponboxes/list',
      headers: this.headers,
      json: true,
      body: {
        trackingId: trackingId,
        totalAmount: totalAmount,
      }
    }, handler.callback);
    return handler.promise;
  }

  // analytics
  analyticsRepurchase (trackingId, totalAmount, callback) {
    const handler = prepare(callback);
    request.post({
      url: this.host + '/api/v1/analytics/repurchase/',
      headers: this.headers,
      json: true,
      body: {
        trackingId: trackingId,
        totalAmount: totalAmount,
      }
    }, handler.callback);
    return handler.promise;
  }
}

