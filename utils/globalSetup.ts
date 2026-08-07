import { FullConfig } from "@playwright/test";
import axios from "axios";
import { Env } from "./environment";

async function globalSetup(config:FullConfig){
   const url= process.env.BASE_URL || 'http://localhost/opencart/upload/'; // Fallback to a default URL if not set in environment variables
   try {
    console.log(`Checking if the application is running at ${url}...`);
    await axios.get(url, { timeout: 5000 }); // Set a timeout of 5 seconds for the request
    console.log('✅ Server is UP and running.\n');
   } catch (error) {
    const Red = "\x1b[31m";
    const Reset = "\x1b[0m";
    
    console.error(`\n${Red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.error(`❌ FATAL ERROR: LOCAL SERVER IS DOWN`);
    console.error(`Please ensure XAMPP (Apache & MySQL) is running.`);
    console.error(`Target: ${url}`);
    console.error(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${Reset}\n`);
    
    // Kill the test run immediately
    process.exit(1);
   }   
}

export default globalSetup;