const ldap = require('ldapjs');

const createDC = ( domain ) => {
    return domain.split('.').map((segment) => `dc=${segment}`).join(',');
}

const domain = process.env.LDAP_HOST;
const port = process.env.LDAP_PORT || 389;
const ou = process.env.LDAP_OU || 'people';
const dc = createDC(process.env.LDAP_DC);

const ldapClient = ldap.createClient({
  url: `ldap://${domain}:${port}`
});

const authenticateLDAP = (username, password) => {
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