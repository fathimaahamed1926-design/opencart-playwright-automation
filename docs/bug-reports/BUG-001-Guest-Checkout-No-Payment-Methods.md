# BUG-001 – Guest Checkout does not display payment methods

## Summary

During Guest Checkout, no payment methods are displayed after completing the Billing Details step.

---

## Environment

Application: OpenCart 3.0.x
Browser: Chrome
Automation Tool: Playwright
Environment: Localhost (XAMPP)

---

## Preconditions

- Product added to cart
- Guest Checkout selected
- Billing details completed successfully

---

## Steps to Reproduce

1. Open Shopping Cart
2. Proceed to Checkout
3. Select Guest Checkout
4. Enter valid customer details
5. Continue to Payment Method

---

## Expected Result

Available payment methods (e.g. Cash on Delivery, Flat Rate, etc.) should be displayed.

---

## Actual Result

Warning message appears:

"No Payment options are available. Please contact us for assistance!"

Payment Method panel contains no selectable payment options.

---

## Severity

High

---

## Priority

High

---

## Impact

Guest users cannot complete the checkout process.

This blocks Guest Checkout end-to-end automation because the application does not expose any valid payment option.

---

## Status

Open

---

## Evidence

Screenshot:

docs/screenshots/BUG-001-payment-method-missing.png

Playwright Trace:

Available in trace.zip