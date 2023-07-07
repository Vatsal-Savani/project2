const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/jwtToken");
const db = require("../models");

const Employee = db.employees;

const isAuthorized = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.send("login required");

  const id = verifyToken(token, "theBoys");

  const { roleId } = await Employee.findOne({
    where: { id },
  });

  roleId === 1 && (req.body.id = id);
  next();
};

module.exports = isAuthorized;
