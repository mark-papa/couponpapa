(function(window) {
  var client = {
    init : function(apiKey, host) {
      this.host = host || 'https://sandbox.couponpapa.io';
      this.apiKey = apiKey;
    },
    check : function(code, trackingId, amount, cb) {
      var options = {
        headers: {
          'Accept': 'application/json',
          'X-Access-Token': this.apiKey,
          'Content-Type': 'text/plain',
        },
        params: {
          trackingId: trackingId,
          totalAmount: amount
        }
      };
      return axios.get(this.host + '/api/codes/' + encodeURIComponent(code) + '/check', options)
      .then(function(response) {
        cb(null, response.data);
      })
      .catch(function (error) {
        cb(error.response.data.error.message);
      });
    },
    use : function(code, trackingId, amount, cb) {
      var options = {
        headers: {
          'Accept': 'application/json',
          'X-Access-Token': this.apiKey,
        }
      };
      return axios.post(this.host + '/api/codes/' + encodeURIComponent(code) + '/use', {
        trackingId: trackingId,
        totalAmount: amount
      }, options)
      .then(function(response) {
        cb(null, response.data);
      })
      .catch(function (error) {
        cb(error.response.data.error.message);
      });
    },
    repurchase : function(trackingId, amount, cb) {
      var options = {
        headers: {
          'Accept': 'application/json',
          'X-Access-Token': this.apiKey,
        }
      };
      return axios.post(this.host + '/api/statistics/repurchase/', {
        trackingId: trackingId,
        totalAmount: amount
      }, options)
      .then(function(response) {
        cb(null, response.data);
      })
      .catch(function (error) {
        cb(error.response.data.error.message);
      });
    },
  };

  window.couponpapa = client;
})(window);
