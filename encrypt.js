const forge = require('node-forge');
const fs = require("fs");
const pki = forge.pki;

const pemPrivate = fs.readFileSync("./private-key.pem", 'utf8');
const privateKey = pki.privateKeyFromPem(pemPrivate);

console.log(pemPrivate);

const pemPublic = fs.readFileSync("./public-key.pem", 'utf8');
const publicKey = pki.publicKeyFromPem(pemPublic);

console.log(pemPublic);

const bytes = "password";

const encrypted = publicKey.encrypt(bytes, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha1.create()
    }
});

const base64 = btoa(encrypted);

console.log(base64);

const decrypted = privateKey.decrypt(atob(base64), 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha1.create()
    }
});

console.log(decrypted);