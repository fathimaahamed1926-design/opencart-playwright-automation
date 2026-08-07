import { faker } from "@faker-js/faker";

export class RandomDataGenerator {
  static generateRandomEmail(): string {
    return faker.internet.email();
  }

  static generateRandomPassword(length: number = 12): string {
    return faker.internet.password({length});
  }

  static generateRandomFirstName():string {
    return faker.person.firstName();
  }

  static generateRandomAlphaNumericPassword(length:number): string {
    return faker.string.alphanumeric(length);
  }

  static generateRandomLastName(): string {
    return faker.person.lastName();
  }

  static generateRandomPhoneNumber(): string {
    return faker.phone.number();
  }

  static generateRandomAddress(): string {
    return faker.location.streetAddress();
  }

  static generateRandomCity(): string {
    return faker.location.city();
  }

  static generateRandomPostalCode(): string {
    return faker.location.zipCode();
  }

  static generateRandomCountry(): string {
    return faker.location.country();
  }

  static generateRandomCompanyName(): string {
    return faker.company.name();
  }

  static generateRandomProductName(): string {
    return `Automation Product-${faker.string.alphanumeric(6)}`;
  }

  static generateRandomProductModel(): string {
    return `Automation Model-${faker.string.alphanumeric(6)}`;
  }
}