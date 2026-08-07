
export class Env {
  public static readonly CUSTOMER_URL: string = process.env.CUSTOMER_URL!; // ! is used to assert that the value will not be undefined, since we are loading it from .env file and will be defined only during runtime.
  public static readonly DB_HOST: string = process.env.DB_HOST!; // value can be fetched using process.env and not directly from the .env file, because dotenv.config() loads the variables into process.env, making them accessible throughout the application
  public static readonly CUSTOMER_USERNAME: string = process.env.CUSTOMER_USERNAME!;
  public static readonly CUSTOMER_PASSWORD: string = process.env.CUSTOMER_PASSWORD!;
  public static readonly DB_NAME: string = process.env.DB_NAME!;
  public static readonly DB_PORT: string = process.env.DB_PORT!
  public static readonly DB_USERNAME: string = process.env.DB_USERNAME!;
  public static readonly DB_PASSWORD: string = process.env.DB_PASSWORD ?? ""; // Use nullish coalescing operator to provide a default value of an empty string if DB_PASSWORD is undefined or null, ensuring that the application does not throw an error when trying to access this variable.
  public static readonly ADMIN_URL: string = process.env.ADMIN_URL!;
  public static readonly ADMIN_USERNAME: string = process.env.ADMIN_USERNAME!;
  public static readonly ADMIN_PASSWORD: string = process.env.ADMIN_PASSWORD!;

  // Add more environment variables as needed
  public static readonly config = {
    urls: {
      customer: Env.CUSTOMER_URL,            // Base URL for the application under test, used for navigating to the main site. Env.CUSTOMER_URL is loaded from the .env file and must be defined for the tests to run successfully
      admin: Env.ADMIN_URL,
  },
    db: {
      host: Env.DB_HOST,
      user: Env.DB_USERNAME,
      password: Env.DB_PASSWORD,
      database: Env.DB_NAME,
      port: Number(Env.DB_PORT)
    },
  };

  public static validate() {
    const isDemo = process.env.CUSTOMER_URL?.includes('demo.opencart.com'); // Check if the CUSTOMER_URL contains 'demo.opencart.com' to determine if we are running against the official demo environment
    const required= isDemo? ['CUSTOMER_URL', 'ADMIN_URL'] : [ 'CUSTOMER_URL', 'ADMIN_URL', 'DB_HOST', 'DB_NAME' ]; // List of required environment variables
    const missing: string[] = [];
    
    for (const key of required) {
      if (!process.env[key]) {
        missing.push(key);
      }
    }

    if (missing.length > 0) {
            // ANSI Color Codes
            const Red = "\x1b[31m";
            const Reset = "\x1b[0m";
            const Yellow = "\x1b[33m";

            console.error(`\n${Red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${Reset}`);
            console.error(`${Red}❌ CONFIGURATION ERROR${Reset}`);
            console.error(`${Yellow}The following environment variables are missing:${Reset}`);
            missing.forEach(key => console.error(`  - ${key}`));
            console.error(`${Yellow}Check your .env.${process.env.ENV || 'local'} file.${Reset}`);
            console.error(`${Red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${Reset}\n`);

            // Stop the process immediately
            process.exit(1);

  }
}
}


