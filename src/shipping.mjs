/** Shared USD shipping rules. No network, DOM, customer data, or payment side effects. */
export const FREE_SHIPPING_THRESHOLD_CENTS = 5000;

function requireCents(value, name) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative safe integer in cents`);
  }
}

/** Tests only the amount threshold, not item or destination eligibility. */
export function qualifiesForFreeShipping(merchandiseSubtotalCents) {
  requireCents(merchandiseSubtotalCents, 'merchandiseSubtotalCents');
  return merchandiseSubtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;
}

/**
 * Integration contract: subtotal is merchandise only, before tax and shipping.
 * A server must validate prices, stock, address, and shipping eligibility.
 * Discount treatment is unconfirmed: discounted orders deliberately stay unresolved.
 * Unknown charges stay null; callers must not coerce them to zero or a final total.
 * This result is not payment authorization, address validation, or a checkout gate.
 */
export function getShippingSummary({
  merchandiseSubtotalCents,
  merchandiseDiscountCents = 0,
  shippingEligible = null,
  quotedShippingCents = null,
}) {
  requireCents(merchandiseSubtotalCents, 'merchandiseSubtotalCents');
  requireCents(merchandiseDiscountCents, 'merchandiseDiscountCents');
  if (merchandiseDiscountCents > merchandiseSubtotalCents) {
    throw new RangeError('Discount cannot exceed the merchandise subtotal');
  }
  if (![null, true, false].includes(shippingEligible)) {
    throw new TypeError('shippingEligible must be true, false, or null');
  }
  if (quotedShippingCents !== null) requireCents(quotedShippingCents, 'quotedShippingCents');

  const result = (status, label, shippingCents = null) => Object.freeze({ status, label, shippingCents });
  if (merchandiseSubtotalCents === 0) return result('empty', 'Add an item to see shipping');
  if (shippingEligible === false) return result('unavailable', 'Shipping unavailable for this order');
  if (shippingEligible === null) return result('eligibility-required', 'Shipping availability confirmed before payment');
  if (merchandiseDiscountCents > 0) return result('discount-policy-required', 'Shipping confirmed before payment');
  if (qualifiesForFreeShipping(merchandiseSubtotalCents)) return result('free', 'Free shipping — $0.00', 0);
  if (quotedShippingCents === null) return result('quote-required', 'Shipping charge confirmed before payment');
  // Below $50 requires customer-paid shipping. A missing rate must never become free.
  if (quotedShippingCents === 0) throw new RangeError('Below-threshold orders require a positive shipping quote');
  const amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(quotedShippingCents / 100);
  return result('quoted', amount, quotedShippingCents);
}
