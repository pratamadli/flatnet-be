const crypto = require('crypto');

// Generate a random 64-byte string in hexadecimal format for session secret
const sessionSecret = crypto.randomBytes(64).toString('hex');
console.log(`Generated Session Secret: ${sessionSecret}`);

// Generate a random 64-byte string in hexadecimal format for JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log(`Generated JWT Secret: ${jwtSecret}`);

// Generate a random 32-byte string in hexadecimal format for API key
const apiKey = crypto.randomBytes(32).toString('hex');
console.log(`Generated API Key: ${apiKey}`);
