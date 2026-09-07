# OpenCart API Testing

## API-001: Add Product to Cart

**Endpoint:** `checkout/cart/add`

**Method:** POST

**Request URL:**
`http://localhost/opencart/upload/index.php?route=checkout/cart/add`

### Request Body

Content-Type: `application/x-www-form-urlencoded`

| Parameter | Value |
|---|---|
| product_id | 43 |
| quantity | 1 |

### Expected Result

- Status code should be `200 OK`
- Response should be JSON
- Response should contain a success message
- Response should contain the cart total

### Actual Result

- Status code: `200 OK`
- Response: JSON
- Success message received
- Cart total received

**Result:** PASS

## API-002: Get Cart Information

**Endpoint:** common/cart/info

**Method:** GET

**Request URL:**

http://localhost/opencart/upload/index.php?route=common/cart/info

### Request Body

No request body required.

### Expected Result
Status code should be 200 OK
Response should contain the cart information
Response should contain the product name
Response should contain the expected product quantity
Response should contain a dynamic cart key for the product
Cart key should be extracted for use in the Remove Product request

### Actual Result
Status code: 200 OK
Cart information received
Product name MacBook received
Product quantity 2 received
Dynamic cart key successfully extracted
Cart key stored as {{cartKey}}

**Result:** PASS

## API-003: Remove Product from Cart

**Endpoint:** checkout/cart/remove

**Method:** POST

**Request URL:**

http://localhost/opencart/upload/index.php?route=checkout/cart/remove

### Request Body

Content-Type: application/x-www-form-urlencoded

Parameter	Value
key	{{cartKey}}

{{cartKey}} is dynamically extracted from the Get Cart Information request.

### Expected Result
Status code should be 200 OK
Response should be JSON
Response should contain a successful cart modification message
Response should indicate that the cart contains 0 item(s)

### Actual Result
Status code: 200 OK
Response: JSON
Successful cart modification message received
Cart total indicates 0 item(s)

**Result:** PASS

## API-004: Verify Empty Cart

**Endpoint:** common/cart/info

**Method:** GET

**Request URL:**

http://localhost/opencart/upload/index.php?route=common/cart/info

### Request Body

No request body required.

### Expected Result
Status code should be 200 OK
Response should contain the empty cart message
Response should contain 0 item(s)
Response should indicate that the shopping cart is empty

### Actual Result
Status code: 200 OK
Empty cart message received
Response contains 0 item(s)
Response contains Your shopping cart is empty!

**Result:** PASS