import test from 'node:test';
import assert from 'node:assert/strict';
import { getShippingSummary, qualifiesForFreeShipping } from '../src/shipping.mjs';

test('the exact $50 boundary qualifies; one cent below does not', () => {
  assert.equal(qualifiesForFreeShipping(4999), false);
  assert.equal(qualifiesForFreeShipping(5000), true);
  assert.equal(qualifiesForFreeShipping(5001), true);
});

test('confirmed shipping is free at and above the threshold even when a paid quote exists', () => {
  for (const cents of [5000, 5001, 50000]) {
    assert.deepEqual(getShippingSummary({ merchandiseSubtotalCents: cents, shippingEligible: true, quotedShippingCents: 725 }), {
      status: 'free', label: 'Free shipping — $0.00', shippingCents: 0,
    });
  }
});

test('unknown below-threshold shipping stays unresolved, never zero', () => {
  assert.deepEqual(getShippingSummary({ merchandiseSubtotalCents: 4999, shippingEligible: true }), {
    status: 'quote-required', label: 'Shipping charge confirmed before payment', shippingCents: null,
  });
});

test('a synthetic quote is displayed exactly and zero is rejected below $50', () => {
  assert.deepEqual(getShippingSummary({ merchandiseSubtotalCents: 4999, shippingEligible: true, quotedShippingCents: 725 }), {
    status: 'quoted', label: '$7.25', shippingCents: 725,
  });
  assert.throws(() => getShippingSummary({ merchandiseSubtotalCents: 4999, shippingEligible: true, quotedShippingCents: 0 }), RangeError);
});

test('tax and shipping never move a merchandise subtotal across the threshold', () => {
  const summary = getShippingSummary({ merchandiseSubtotalCents: 4900, shippingEligible: true, quotedShippingCents: 725, taxCents: 404 });
  assert.equal(summary.status, 'quoted');
  assert.equal(summary.shippingCents, 725);
});

test('removing an item recalculates shipping and clearing the cart removes the offer', () => {
  const summaries = [5100, 4999, 0].map(merchandiseSubtotalCents => getShippingSummary({ merchandiseSubtotalCents, shippingEligible: true }));
  assert.deepEqual(summaries.map(s => s.status), ['free', 'quote-required', 'empty']);
  assert.deepEqual(summaries.map(s => s.shippingCents), [0, null, null]);
});

test('threshold alone never grants shipping for an unknown or unsupported destination/item', () => {
  assert.equal(getShippingSummary({ merchandiseSubtotalCents: 5000 }).status, 'eligibility-required');
  assert.equal(getShippingSummary({ merchandiseSubtotalCents: 5000, shippingEligible: false }).status, 'unavailable');
});

test('discounts stay blocked until the owner confirms their threshold treatment', () => {
  for (const merchandiseDiscountCents of [1, 1000, 6000]) {
    const summary = getShippingSummary({ merchandiseSubtotalCents: 6000, merchandiseDiscountCents, shippingEligible: true });
    assert.equal(summary.status, 'discount-policy-required');
    assert.equal(summary.shippingCents, null);
  }
});

test('malformed currency cannot silently qualify or become a free quote', () => {
  for (const value of [-1, 50.5, NaN, Infinity, '5000', null, undefined, true, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => qualifiesForFreeShipping(value), TypeError);
    if (value !== null && value !== undefined) {
      assert.throws(() => getShippingSummary({ merchandiseSubtotalCents: 4999, shippingEligible: true, quotedShippingCents: value }), TypeError);
    }
  }
});

test('invalid discount and eligibility inputs are rejected', () => {
  assert.throws(() => getShippingSummary({ merchandiseSubtotalCents: 5000, merchandiseDiscountCents: -1 }), TypeError);
  assert.throws(() => getShippingSummary({ merchandiseSubtotalCents: 5000, merchandiseDiscountCents: 5001 }), RangeError);
  assert.throws(() => getShippingSummary({ merchandiseSubtotalCents: 5000, shippingEligible: 'true' }), TypeError);
});
