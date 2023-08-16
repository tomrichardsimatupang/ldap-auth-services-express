const fs = require('fs');
const forge = require('node-forge');

// Generate an RSA key pair
const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

// Convert the private key to PEM format
const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);

// Convert the public key to PEM format
const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);

// Save the private key to a file
fs.writeFileSync('private-key.pem', privateKeyPem);

// Save the public key to a file
fs.writeFileSync('public-key.pem', publicKeyPem);

console.log('\x1b[32m%s\x1b[0m', 'RSA key pair generated and saved.');