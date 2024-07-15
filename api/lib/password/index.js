const { createHash } = require("crypto");

/**
 * パスワードをハッシュ化する関数
 */
const hashPassword = (password) => {
  const hash = createHash('sha256');
  return hash.update(password).digest('hex');
};

/**
 * パスワードが一致するかどうかを比較する関数
 */
const comparePassword = (
  inputPassword,
  storedHash,
) => {
  const hashedInputPassword = hashPassword(inputPassword);
  return hashedInputPassword === storedHash;
};

module.exports = {
    hashPassword,
    comparePassword
}