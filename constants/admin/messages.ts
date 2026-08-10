export const LoginMessages= {
INVALID_CREDENTIALS: "No match for Username and/or Password.",
LOGOUT_SUCCESS: "You have been logged off your account.",
EXCEEDED_ATTEMPTS: "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour or reset password."
} as const;

export const ProductMessages = {
    PRODUCT_CREATED: "Success: You have added a new product!",
    PRODUCT_UPDATED: "Success: You have modified products!",
    PRODUCT_DELETED: "Success: You have modified products!"
} as const;

export const CategoryMessages = {
    CATEGORY_CREATED: "Success: You have added a new category!",
    CATEGORY_UPDATED: "Success: You have modified categories!",
    CATEGORY_DELETED: "Success: You have deleted the selected categories!"
} as const;

export const OrderMessages = {
    ORDER_UPDATED: "Success: You have modified orders!",
    ORDER_CONFIRMED: "Your order has been placed!"
} as const;