import { th } from "@faker-js/faker";

export class Env {
  public static readonly BASE_URL: string = process.env.BASE_URL!;
  public static readonly DB_HOST: string = process.env.DB_HOST!; // ! is used to assert that the value will not be undefined, since we are loading it from .env file
  public static readonly DB_USER: string = process.env.DB_USER!;
  public static readonly DB_PASS: string = process.env.DB_PASS!;
  public static readonly DB_NAME: string = process.env.DB_NAME!;
  public static readonly ADMIN_URL: string = process.env.ADMIN_URL!;

  // Add more environment variables as needed
  public static validate() {
    const required= [ 'BASE_URL', 'DB_HOST', 'DB_NAME' ]; // List of required environment variables
    for (const key of required) {
      if (!process.env[key]) {
        throw new Error(`❌ Missing config: ${key} is not defined in .env file`);
      }
    }

  }
}