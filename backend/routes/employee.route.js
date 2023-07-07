const express = require("express");
const {
  getAllEmployees,
  changeStatus,
  updateEmployee,
  createEmployee,
  login,
  adminUpdateEmployee,
  getGenderRatio,
  getWorkStatusRatio,
  checkDepartment,
} = require("../controllers/employee.contoller");
const isAuthorized = require("../middlewares/login.auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hey there!");
});

router.get("/checkDepartment", checkDepartment);
router.get("/getalldata", getAllEmployees);
router.post("/register", createEmployee);
router.post("/login", login);
router.post("/changeStatus", changeStatus);
router.post("/updateEmployee", isAuthorized, updateEmployee);
router.post("/adminUpdateEmployee", isAuthorized, adminUpdateEmployee);
router.get("/getGenderRatio", getGenderRatio);
router.get("/getWorkStatusRatio", getWorkStatusRatio);

module.exports = { router };
