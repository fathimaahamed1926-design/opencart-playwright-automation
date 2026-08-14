import {test as base} from "../guest.fixture"
import { ConfirmPassword, NewCustomerDetails } from "../../types/types"
import { RandomDataGenerator } from "../../utils/randomDataGenerator";
import { CustomerRepository } from "../../utils/database/CustomerRepository";

type CustomerRegistrationData= {
  randomRegistrationData:NewCustomerDetails;
};

export const test= base.extend<CustomerRegistrationData> ({
  
  randomRegistrationData: async({},use)=> {
    const password = RandomDataGenerator.generateRandomPassword();
  const randomCustomerRegData:NewCustomerDetails = {
    
    email:RandomDataGenerator.generateRandomEmail(),
    telephone:Number(RandomDataGenerator.generateRandomPhoneNumber()),
    password: password,
    passwordConfirm: password,
    addressDetails:{
      firstName: RandomDataGenerator.generateRandomFirstName(),
      lastName: RandomDataGenerator.generateRandomLastName(),
      address1: RandomDataGenerator.generateRandomAddress(),
      city: RandomDataGenerator.generateRandomCity(),
      postcode: RandomDataGenerator.generateRandomPostalCode(),
      country: "Australia",
      state: RandomDataGenerator.generateRandomState()
    }
  }
  await use(randomCustomerRegData);

  try{
  await CustomerRepository.cleanupCustomer(randomCustomerRegData.email);
  }
  catch(error){
    console.error("customer cleanup failed", error);
  }
  }
})
