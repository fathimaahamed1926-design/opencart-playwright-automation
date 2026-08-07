import { ProductStatus } from "../enums/enums";              

export interface BillingInfo {
  firstName: string;
  lastName: string;
  companyName?: string;
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  country: string;
  state: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  companyName?: string;
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  country: string;
  state: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ProductFilter {
    productName?: string;
    model?: string;
    price?: number;
    quantity?: number;
    status?: ProductStatus
}

export interface OrderFilter {
    orderId?: string;
    customer?: string;
    orderStatus?: string;
    total?: number;
    dateAdded?: string;
    dateModified?: string;
}

export interface CreateProductData {
  productName: string;
  productDescription?: string;
  metaTagTitle: string;
  model: string;
  price?: number;
  quantity?: number;
  status?: ProductStatus;
}

export interface TestProduct {
  productName: string;
  model: string;
}
