const jwt = require("jsonwebtoken");
const secretKey = "apaya";

function generteToken(payload) {
  const token = jwt.sign(payload, secretKey);
  return token;
}

function readToken(token) {
  const payload = jwt.verify(token, secretKey);
  return payload;
}

module.exports = {
  generteToken,
  readToken,
};
