const ldap = require('ldapjs');
const forge = require('node-forge');
const fs = require("fs");
const pki = forge.pki;

const createDC = ( domain ) => {
    return domain.split('.').map((segment) => `dc=${segment}`).join(',');
}

const domain = process.env.LDAP_HOST;
const port = process.env.LDAP_PORT || 389;
const ou = process.env.LDAP_OU || 'people';
const dc = createDC(process.env.LDAP_DC);
const pem = fs.readFileSync("./private-key.pem", 'utf8');
const privateKey = pki.privateKeyFromPem(pem);

const ldapClient = ldap.createClient({
  url: `ldap://${domain}:${port}`
});

const authenticateLDAP = (username, passwordEncrypted) => {

  const password = privateKey.decrypt(atob(passwordEncrypted), 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha1.create()
    }
  });

  return new Promise((resolve, reject) => {
    ldapClient.bind(`cn=${username},ou=${ou},${dc}`, password, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = authenticateLDAP;