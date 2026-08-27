import { DefaultValues } from "../../../constants/customer/const";
import {test, expect} from "../../../fixtures/testData/order.verification.fixture";
import { OrderDatabaseHelper } from "../../../utils/database/OrderDatabaseHelper";

test.describe("End to end test on customer order verification flow", ()=> {
  test("Admin can verify order placed by a customer", async({purchaseFlow, ordersPage, orderDetailsPage})=>{
    const productName = "MacBook Air";
    const quantity = 2;
    const expectedStatus = "Pending"
    await purchaseFlow.placeReturningCustomerOrder(productName,quantity.toString());

    const orderId= (await OrderDatabaseHelper.getRecentOrderId(DefaultValues.CUSTOMER_ID)).toString();

    await ordersPage.sidebar.openOrders();
    await ordersPage.filterOrders({orderId:orderId});

    const actualStatus= await ordersPage.getStatus(orderId);
    expect(actualStatus).toBe(expectedStatus);

    await ordersPage.viewOrder(orderId);

    await orderDetailsPage.verifyOrderDetailsPageLoaded();

    const actualCustomerName=await orderDetailsPage.getCustomerName();
    console.log("actual customer Name:", actualCustomerName);
    expect(actualCustomerName).toBe("fathima Ahamed");

    const actualProductName=await orderDetailsPage.getProductName(productName);
    console.log("actual product name:",actualProductName)
    expect(actualProductName).toBe(productName);

    const actualQuantity=await orderDetailsPage.getProductQuantity(productName);
    expect(actualQuantity).toBe(quantity);
  })
})