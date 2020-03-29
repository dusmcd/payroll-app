const crypto = require('crypto');

function encryptPassword(plainText, salt) {
  const algorithm = 'aes-192-cbc';
  const passkey = process.env.PASSKEY;
  const key = crypto.scryptSync(passkey, salt, 24);

  const iv = Buffer.alloc(16, 0);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedPassword = cipher.update(plainText, 'utf8', 'hex');
  encryptedPassword += cipher.final('hex');
  return encryptedPassword;
}

module.exports = encryptPassword;
