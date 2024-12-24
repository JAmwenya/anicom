const fs = require("fs");
const path = require("path");

// Define the environment variables
const envVariable = `# .env file

# Backend API URL
REACT_APP_API_BASE_URL=http://localhost:5000
`;

// Path to the .env file
const envPath = path.join(__dirname, ".env");

// Write the environment variables to the .env file
fs.writeFileSync(envPath, envVariable, { encoding: "utf8" });

console.log(".env file has been created successfully!");
