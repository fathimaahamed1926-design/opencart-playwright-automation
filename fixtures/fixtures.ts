import {test as base} from '@playwright/test';  // {name} means specific classes import from playwright package
import testData from '../testdata/customer/checkoutAddressData.json'; // name without braces means default imprt of the whole file
import {BillingInfo, ShippingInfo} from '../types/types'; // importing the BillingInfo interface from types.ts file

type MyFixtures = {
  billingInfo: BillingInfo;  // defining the type of billingInfo as the BillingInfo interface
  shippingInfo: ShippingInfo;
}

export const test = base.extend<MyFixtures> ({  // extending the base test with our custom fixtures
    billingInfo: async({},use)=> {             // worker function for billingInfo fixture, can pass other dependencies as first argument if needed, use enables us to use the fixture value in our tests i.e. autocomplete the values
      await use(testData.billingAddress);       
    },

    shippingInfo: async({}, use)=> {
      await use(testData.shippingAddress); 
    }
  }
);

export {expect} from '@playwright/test';

