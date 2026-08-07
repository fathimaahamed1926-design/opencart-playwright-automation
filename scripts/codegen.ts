// This script is used to launch the Playwright Codegen tool with the appropriate environment variables and authentication storage.
import { execSync } from "child_process";  // Importing the execSync function from the child_process module to execute shell commands synchronously.
import dotenv from 'dotenv'; // Importing the dotenv module to load environment variables from a .env file.
import path from 'path'; 
import fs from 'fs'; // Importing the fs module to interact with the file system, specifically to check for the existence of the authentication storage file.

const env = process.argv[2] || 'local';  // The first command-line argument specifies the environment (e.g., local, staging, production). If not provided, it defaults to 'local'.
const type = process.argv[3] || 'base';  // The second command-line argument specifies the type (e.g., admin, base). If not provided, it defaults to 'base'.
const envPath = path.resolve(__dirname, '..', 'env', `.env.${env}`); // Constructing the absolute path to the .env file based on the specified environment. It assumes that the .env files are located in a directory named 'env' at the root of the project.

dotenv.config({ path: envPath}); // Loading the environment variables from the specified .env file using dotenv.

const targetUrl = type === 'admin' ? process.env.ADMIN_URL : process.env.BASE_URL; 

const authFile = `auth-${env}-${type}.json`;   // Constructing the filename for the authentication storage based on the environment and type.

//check if the auth file exists
const fileExists = fs.existsSync(authFile);

console.log(`🚀 Launching Codegen for: ${env.toUpperCase()} (${type.toUpperCase()})`);
console.log(`🔗 URL: ${targetUrl}`);

const loadCommand = fileExists ? `--load-storage=${authFile}` : ''; // If the authentication storage file exists, include the --load-storage option to load it.

execSync(`npx playwright codegen ${loadCommand} --save-storage=${authFile} ${targetUrl}`, {stdio: 'inherit'});  //