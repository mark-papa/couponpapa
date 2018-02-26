const assert = require('assert');
const Couponpapa = require('..');

describe('API', function() {
  const cpp = new Couponpapa('YOUR-API-KEY', 'sandbox');
  const CODE = 'TESTCODE';
  const trackingId = 'test@couponpapa.io';
  const orderId = 1;
  const tag = 'NEWUSER';

  describe('check', function() {
    it('code: ' + CODE, async () => {
      try {
        const result = await cpp.codesCheck(CODE, trackingId, 100);
        assert.equal(result.code, CODE);
      } catch (e) {
        assert.equal(e, 'WRONG CODE');
      }
    });
  });

  describe('use', function() {
    it('code: ' + CODE, async () => {
      try {
        const result = await cpp.codesUse(CODE, trackingId, 100, orderId);
        assert.equal(result.code, CODE);
      } catch (e) {
        assert.equal(e, 'WRONG CODE');
      }
    });
  });

  describe('cancel', function() {
    it('cancel order ID: ' + orderId, async () => {
      try {
        const result = await cpp.codesCancel(orderId);
        assert.equal(result.code, CODE);
      } catch (e) {
        assert.equal(e, 'OrderId not found - No code to cancel');
      }
    });
  });

  describe('fire', function() {
    it('tag: ' + tag, async () => {
      const result = await cpp.codesFire(tag, trackingId);
      assert.equal(result.sent, 0);
    });
  });

  describe('list', function() {
    it('trackingId: ' + trackingId, async () => {
      const result = await cpp.couponboxesList(trackingId, 100);
      assert.equal(result.coupons.length, 0);
    });
  });

  describe('repurchase', function() {
    it('trackingId: ' + trackingId, async () => {
      const result = await cpp.analyticsRepurchase(trackingId, 10);
      assert.equal(result.trackingId, trackingId);
    });
  });
});
