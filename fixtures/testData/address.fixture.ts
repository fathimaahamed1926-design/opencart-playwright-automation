import {test as customerTest} from '../customer.fixture';  // {name} means specific classes import from playwright package
import {BillingInfo, ShippingInfo} from '../../types/types'; // importing the BillingInfo interface from types.ts file
import { RandomDataGenerator } from '../../utils/randomDataGenerator';
import { AddressDatabaseHelper } from '../../utils/database/AddressDatabaseHelper';
import { DefaultValues } from '../../constants/customer/const';

type AddressFixtures = {
  billingInfo: BillingInfo;  
  shippingInfo: ShippingInfo;
  registerAddressForCleanup:(address:BillingInfo) => void;
}

export const test = customerTest.extend<AddressFixtures> ({  
    billingInfo: async({},use)=> {  
      const addressData:BillingInfo = RandomDataGenerator.generateRandomAddressDetails();
      await use(addressData);                
    },

    registerAddressForCleanup: async({}, use)=> {
      let addressToCleanup: BillingInfo [] = [] ;
      const registerAddress = (address:BillingInfo) => {
        addressToCleanup.push(address);
        console.log(`📝 Registered address for cleanup: ${address.address1}`);
      }
      await use(registerAddress);

      console.log("🧹 Starting database cleanup...");

      if(!addressToCleanup) {
        console.log("🧹 No address registered for cleanup.");
        return;
      }
      for(const address of addressToCleanup) {
      await AddressDatabaseHelper.deleteAddress(DefaultValues.CUSTOMER_ID, address.address1);
      }

      console.log("🧹 Database cleanup finished.");
    },

    shippingInfo: async({}, use)=> {
      const addressData:ShippingInfo = RandomDataGenerator.generateRandomAddressDetails();
      await use(addressData);    
    }
  }
);

export {expect} from '@playwright/test';

