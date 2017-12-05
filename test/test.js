var assert = require('assert');
var cpClient = require('..')

describe('API', function() {
  const client = new cpClient('YOUR-API-KEY');
  const CODE = 'TESTCODE';
  const trackingId = 'test@couponpapa.io';

  describe('check', function() {
    it('code: ' + CODE, async () => {
      try {
        const result = await client.check(CODE, 100, trackingId);
        assert.equal(result.code, CODE);
      } catch (e) {
        assert.equal(e, 'wrong code');
      }
    });
  });

  describe('use', function() {
    it('code: ' + CODE, async () => {
      try {
        const result = await client.use(CODE, 100, trackingId);
        assert.equal(result.code, CODE);
      } catch (e) {
        assert.equal(e, 'wrong code');
      }
    });
  });

  describe('repurchase', function() {
    it('trackingId: ' + trackingId, async () => {
      const result = await client.repurchase(trackingId, 10);
      assert.equal(result.trackingId, trackingId);
    });
  });
});
