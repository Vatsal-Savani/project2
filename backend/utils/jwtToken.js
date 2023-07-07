var jwt = require("jsonwebtoken");

const createToken = (id) => {
  let token = jwt.sign({ id: id }, "theBoys");

  let newtoken = jwt.sign(token, "newKey");

  console.log(newtoken);

  return token;
};

const verifyToken = (token, key) => {
  const { id } = jwt.verify(token, key);

  return id;
};

module.exports = { createToken, verifyToken };
