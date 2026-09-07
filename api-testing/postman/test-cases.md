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