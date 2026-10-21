# Shipping policy and secure checkout handoff

Status: draft only, October 21, 2026. No payments, live rates, provider settings,
deployment, or customer communication changed by this work.

## Confirmed rule and draft implementation

- Free shipping at **$50.00 or more**, including exactly $50.00.
- Below $50.00, the customer pays the disclosed shipping charge.
- Use the merchandise subtotal, excluding shipping and applicable tax. Those
  charges must not make an otherwise ineligible order qualify.
- Item and destination eligibility must be confirmed independently of the amount.
- Do not silently substitute $0 for an unknown shipping charge.

`policies.html#shipping` provides customer wording without naming an unconfirmed
carrier, rate, processing window, destination list, or arrival guarantee. It
retains the current email-request flow and existing condition, contribution,
privacy, and contact information. It does not claim that checkout is active.

`src/shipping.mjs` is a dependency-free module for both browser estimates and the
future server integration. It is deliberately **not wired to a payment button**:
this GitHub branch contains no cart, catalogue, or server. Import
`getShippingSummary` into those components when their secure implementation is
ready. `qualifiesForFreeShipping` tests only the dollar threshold.

## Evidence and unresolved business decisions

| Topic | Evidence reviewed | Required decision or verification |
| --- | --- | --- |
| Threshold | Owner's current instruction | Confirmed: use `>= 5000`, never `> 5000`. |
| Discounts | No confirmed treatment retrieved | Recommend merchandise subtotal **after merchandise discounts**, before tax/shipping. Owner decision needed; discounted orders return `discount-policy-required` until implemented and tested. Do not enable promo codes meanwhile. |
| Carrier and service | GitHub draft names none. A separately saved Site snapshot names USPS Ground Advantage for one PS5 listing. | Confirm carriers/services for the actual catalogue. Do not generalize an item-specific statement into a store-wide commitment. |
| Rates below $50 | No adopted fixed rate or verified rating integration found | Choose actual carrier-calculated rates or approved fixed rates after checking packed weights/dimensions and costs. No dollar rate is invented. |
| Processing | Earlier Policy Packet contains 2–5 business days, but effective date/adoption signature are blank. Separate saved PS5 copy repeats it. | Confirm the business can meet a store-wide window, operating days, cutoff, and holiday treatment before publishing it. |
| Delivery | No store-wide arrival commitment verified | Confirm service estimates per item/destination; distinguish handling from transit. Do not promise guaranteed dates or automatically reuse the PS5 estimate. |
| Coverage | Separate saved Site says U.S.; GitHub draft and unsigned packet do not establish coverage | Confirm contiguous states, Alaska/Hawaii, territories, PO boxes, military addresses, and any international support. Do not assume all U.S. addresses or worldwide shipping are available. |
| Tracking | No tested store-wide tracking notification flow established | Confirm tracked services, how tracking is sent, sender/contact ownership, and dispatch events. Public copy only describes tracking when available and how to request help. |
| Mixed fulfillment | Prior packet allows pickup-only items | Decide mixed-cart handling; block unsupported mixed orders until handled explicitly. No universal heavy-item surcharge or exclusion is invented. |

The earlier `Treasured_Twice_LLC_Policy_Packet.docx` (version 1, modified October
8, 2026 Central time) was read for continuity. Its review/adoption section calls
the forms blank templates. Its possible 2–5-day timeframe is evidence of a prior
draft, not evidence of the owner's signed adoption. The current $50-or-more
instruction controls the threshold.

## Coordination with separate checkout work

GitHub base: `codex/logo-teal-background`, commit
`91921e1e88c2e04466c2325ff4ebc8b801258bb1` (PR #24). The GitHub open-PR review
found no separate checkout PR as of this inspection.

A separate saved Site source snapshot (`342507d`) contains `dist/cart.html`,
`dist/src/cart-store.js`, and `dist/src/cart.js`. It is **not this repository's
draft source**, and was not edited or deployed. It is not proof of current live
checkout behavior. Specific reconciliation points:

- `cart-store.js`: change the legacy `subtotalCents > 5000` behavior to the shared
  inclusive rule, with server-side validation.
- `cart.html` and that source's `policies.html`: remove contradictory “over $50”
  and “$50 or less” wording. Use “$50 or more” and “below $50”.
- `cart.js`: the saved snapshot routes only a PS5-only cart to a fixed payment
  link. Do not treat that as a general cart checkout. The separately implemented
  endpoint must use the actual validated cart and inventory.
- Keep `policies.html#shipping` working. Reconcile email-only ordering/privacy
  claims when general secure checkout actually becomes active.

## Cart and checkout contract

1. Show distinct rows for merchandise subtotal, merchandise discounts (when
   approved), shipping, applicable tax, and total. In a cart awaiting a quote,
   display “Shipping charge confirmed before payment”; call the known amount a
   merchandise subtotal, not a final payable total. Never use `null ?? 0` for
   shipping, or charge a merchandise-only amount as a final total.
2. At $49.99: a confirmed positive shipping quote is required. At $50.00 and
   $50.01: show **Free shipping — $0.00** once shipping eligibility is verified.
   Recalculate after additions, removals, quantity changes, price/discount
   changes, and address changes. Empty carts show no free-shipping offer.
3. Collect the shipping recipient's name, street address, unit when applicable,
   city, region, postal code, country, and order-contact email securely. Do not
   assume a billing address is the delivery address. Request a phone only when
   required. Do not store addresses or emails in localStorage or this repository.
4. Validate destination/item serviceability and authoritative inventory/price
   data on the server. Ignore client-submitted totals, free-shipping flags, and
   quote amounts. Bind a paid quote to the actual cart and destination; invalidate
   stale quotes. Check delivery data even when shipping costs zero.
5. Configure Stripe address collection using only approved destination countries.
   Country collection alone does not prove region, postal-code, PO-box, or item
   serviceability. Below threshold, create checkout only after a supported,
   confirmed shipping charge exists. At threshold, pass a verified zero-dollar
   shipping option; never give a below-threshold buyer a selectable free option.
   Do not populate a delivery estimate without support for it.
6. Resolve any discounts before setting shipping. Hosted checkout discounts
   must not subsequently change the subtotal without recalculating shipping.
   Preserve the separate integration's verified tax configuration; this module
   does not calculate tax or establish tax registration.
7. The shipping result alone never enables payment. Require valid stock,
   server-validated prices, address, applicable tax, final total, and other
   checkout gates. Require authenticated Stripe webhook processing and paid
   status before fulfillment; a success redirect does not prove payment.
8. Save the agreed shipping terms with the order. Confirm processing/dispatch
   expectations before payment. Track dispatch separately from payment and label
   creation. Test receipts, shipment updates, and delay/cancellation handling.

## Verification and release checks

`npm run build` runs the existing Treasure List tests, the new shipping tests,
and all existing static-site checks. Shipping tests cover $49.99/$50.00/$50.01,
unknown/paid/free charges, empty carts, removal below the threshold, tax exclusion,
unconfirmed or unsupported eligibility, discounts, and invalid inputs. The $7.25
test quote is synthetic, not a proposed or approved business rate.

Before releasing the separate checkout: run sandbox end-to-end tests at each
boundary, including shipping address collection on free orders, unsupported
addresses, missing/stale quotes, cart tampering, mixed fulfillment, failed
payments, and repeated webhooks. Confirm phone layouts and no horizontal overflow.
No purchase or end-to-end checkout test was performed by this policy-only change.

Recorded validation: all 16 automated tests passed (10 shipping, 6 existing
Treasure List), plus static QA across 19 pages and 375 local references, and
`git diff --check`. Browser visual QA remains unverified: a local static preview
started, but the supported browser did not complete opening it. Review 320,
390, 768, 1024, and 1440px layouts before merge, including anchor visibility under
sticky navigation. Responsive CSS retains existing navigation, uses wrapping
links, and stacks shipping-charge rows at 640px; these source checks do not
substitute for a rendered phone test.

This draft must remain unmerged and unpublished until its operational decisions
and the separate checkout integration are reviewed. Public copy's pre-payment
confirmation requirement is not permission to accept paid orders indefinitely
without a supported shipping timeframe. FTC rules require a reasonable basis for
shipment promises and delay consent/refunds when applicable; the operational
workflow must implement those protections.

References checked October 21, 2026:

- [Stripe: shipping rates with Checkout Sessions](https://docs.stripe.com/payments/advanced/charge-shipping?payment-ui=embedded-components)
- [Stripe: customize shipping options](https://docs.stripe.com/payments/checkout/custom-shipping-options)
- [FTC: Mail, Internet, or Telephone Order Merchandise Rule](https://www.ftc.gov/legal-library/browse/rules/mail-internet-or-telephone-order-merchandise-rule)
- [FTC: business guide to shipment promises, delays, and refunds](https://www.ftc.gov/business-guidance/resources/business-guide-ftcs-mail-internet-or-telephone-order-merchandise-rule)
