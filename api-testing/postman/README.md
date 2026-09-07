### API Testing – Cart

Implemented Postman API tests for the OpenCart cart workflow.

#### Cart API workflow

1. **POST – Add Product to Cart**
   - Verify HTTP 200 status
   - Verify success message
   - Verify product name

2. **GET – Cart Information**
   - Verify HTTP 200 status
   - Verify product exists
   - Verify expected quantity
   - Extract dynamic `cartKey`

3. **POST – Remove Product from Cart**
   - Pass dynamic `cartKey`
   - Verify HTTP 200 status
   - Verify successful removal
   - Verify cart contains zero items

4. **GET – Empty Cart**
   - Verify HTTP 200 status
   - Verify `0 item(s)`
   - Verify `Your shopping cart is empty!`

The complete workflow is executed using Postman Collection Runner with
requests chained through collection variables.