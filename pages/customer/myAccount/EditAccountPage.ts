import {Locator, Page, expect} from "@playwright/test";
import { CustomerAccountBasePage } from "./CustomerAccountBasePage";

// This class represents the Edit Account page in the customer account section of the application. extends the CustomerAccountBasepage class, inheriting common functionality for customer account pages.
export class EditAccountPage extends CustomerAccountBasePage {

    private readonly emailInput: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly telephoneInput: Locator;

constructor(page: Page){
  super(page);

  this.firstNameInput= page.getByRole('textbox', { name: /First Name/ });
  this.lastNameInput = page.getByRole('textbox', { name: /Last Name/ });
  this.emailInput= page.getByRole('textbox', { name: /E-Mail/ });
  this.telephoneInput= page.getByRole('textbox', { name: /Telephone/ });

}

async updateFirstName(firstName:string){
  await this.firstNameInput.fill(firstName);
}

async updateLastName(lastName:string){
  await this.lastNameInput.fill(lastName); 
}

async updateEmail(email:string){
  await this.emailInput.fill(email);  
}

async updateTelephone(telephone:string){
  await this.telephoneInput.fill(telephone);    
}

}

//alternative form to be updated later
/*
async updateFirstName(firstName: string): Promise<this> {
    await this.firstNameInput.fill(firstName);
    return this;
}
Test will become simplified as follows:
await editAccountPage
    .updateFirstName("John")
    .updateLastName("Smith")
    .updateTelephone("0400111222")
    .save();
    */
