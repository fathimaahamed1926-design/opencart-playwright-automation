# BUG-002 – Checkout "Continue" button intermittently fails to advance to the next checkout step

## Summary

During the checkout process, clicking the **Continue** button in the **Billing Details** section occasionally fails to expand the next checkout step (**Delivery Details**) even though the associated AJAX request completes successfully.

A second click on the Continue button consistently advances the checkout flow.

---

## Environment

Application: OpenCart 3.0.x

Browser: Chrome

Automation Tool: Playwright

Environment: Localhost (XAMPP)

---

## Preconditions

- Customer is logged in.
- At least one product has been added to the shopping cart.
- User has navigated to the Checkout page.
- Existing billing address is selected.

---

## Steps to Reproduce

1. Login as an existing customer.
2. Add a product to the shopping cart.
3. Proceed to Checkout.
4. Leave the default "Use existing address" option selected.
5. Click **Continue** in the **Billing Details** section.

---

## Expected Result

The Billing Details section should complete successfully and the **Delivery Details** section should automatically expand, allowing the user to continue the checkout process.

---

## Actual Result

The Billing Details AJAX request completes successfully (HTTP 200), but the checkout UI remains on the Billing Details section.

The Delivery Details section does not expand and the checkout flow cannot continue until the Continue button is clicked a second time.

---

## Frequency

Intermittent (Observed consistently during automated execution in the local environment.)

---

## Severity

Medium

---

## Priority

Medium

---

## Impact

For automated testing, this causes checkout tests to fail because the expected next section never becomes available after the initial click. But during direct interactions in the front-end application as a customer, the continue button is working as intended.

---

## Technical Observations

- AJAX request to:

  ```
  index.php?route=checkout/payment_address/save
  ```

  returns **HTTP 200 OK**.

- Response payload:

  ```json
  []
  ```

- Despite the successful response, the checkout UI does not transition to the Delivery Details step after the first click.

- A second click on the Continue button successfully advances the checkout workflow.

---

## Workaround

Automation framework implements a retry mechanism that performs a second click if the checkout step does not advance after the initial interaction.

This workaround is intended only to stabilize automated tests.

---

## Status

Open

---

## Evidence

### Screenshot

```
docs/screenshots/BUG-002-checkout-continue-button.png
```

### Playwright Trace

```
trace.zip
```

### Network Evidence

POST

```
index.php?route=checkout/payment_address/save
```

Status:

```
200 OK
```

Response:

```json
[]
```