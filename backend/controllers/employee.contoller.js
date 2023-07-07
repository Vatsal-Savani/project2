const db = require("../models/index");
const { hashPassword, verifyPassword } = require("../utils/hashing");
const { createToken } = require("../utils/jwtToken");

const Departments = db.department;
const Employees = db.employees;
const Address = db.address;
const Role = db.role;
const WorkStatus = db.workstatus;

const checkDepartment = async (req, res) => {
  const data = await Departments.findAll({
    attributes: [
      "id",
      ["departmentName", "label"],
      [db.Sequelize.fn("COUNT", db.Sequelize.col("Employees.id")), "value"],
    ],
    include: [{ model: Employees, attributes: [] }],
    group: ["Department.id"],
  });

  res.send(data);
};

const getAllEmployees = async (req, res) => {
  // const data = await Employees.findAll({
  //   attributes: {
  //     exclude: ["password"],
  //   },
  // });

  const data = await Role.findAll({
    include: [Employees],
  });

  res.send(data);
};

const createEmployee = async (req, res) => {
  const { password, email, ...otherData } = req.body;

  const isEmployee = await Employees.findAll({
    where: {
      email,
    },
  });

  if (isEmployee.length > 0) {
    res.send("User Already Exist on this email");
    return;
  }

  const hashedPassword = await hashPassword(password);

  const employeeData = {
    email,
    password: hashedPassword,
    ...otherData,
  };

  const data = await Employees.create(employeeData);

  const token = createToken(data.id);
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };

  res
    .status(200)
    .cookie("token", token, options)
    .send("Employee created successfully");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const employee = await Employees.findOne({
    where: {
      email,
    },
  });

  if (!employee) {
    res.send("invalid Username or Password");
    return;
  }

  const isEmployee = await verifyPassword(password, employee.password);

  if (!isEmployee) {
    res.send("parso ko aa 'must naha dhoke parso ko aa'.");
    return;
  }

  const token = createToken(employee.id);
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };

  res.status(200).cookie("token", token, options).send(true);
};

const updateEmployee = async (req, res) => {
  let { current, permanent, id, roleId, ...employeedata } = req.body;

  if (roleId) roleId = 1;

  const data = await Employees.update(
    {
      ...employeedata,
    },
    {
      where: {
        id,
      },
    }
  );

  const addressExists = await Address.findAll({
    where: {
      empId: id,
    },
  });

  if (addressExists.length != 0) {
    current &&
      (await Address.update(
        { ...current },
        { where: { empId: id, type: "current" } }
      ));

    permanent &&
      (await Address.update(
        { ...permanent },
        { where: { empId: id, type: "permanent" } }
      ));

    res.send("updated");
    return;
  }

  current &&
    (await Address.create({
      empId: id,
      ...current,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    }));
  permanent &&
    (await Address.create({
      empId: id,
      ...permanent,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    }));

  res.send("updated");
};

const adminUpdateEmployee = async (req, res) => {
  const { current, permanent, id, ...employeedata } = req.body;
  console.log(current, permanent, id, employeedata);

  const data = await Employees.update(
    {
      ...employeedata,
    },
    {
      where: {
        id,
      },
    }
  );

  const addressExists = await Address.findAll({
    where: {
      empId: id,
    },
  });

  if (addressExists.length != 0) {
    current &&
      (await Address.update(
        { ...current },
        { where: { empId: id, type: "current" } }
      ));

    permanent &&
      (await Address.update(
        { ...permanent },
        { where: { empId: id, type: "permanent" } }
      ));

    res.send("updated");
    return;
  }

  current &&
    (await Address.create({
      empId: id,
      ...current,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    }));
  permanent &&
    (await Address.create({
      empId: id,
      ...permanent,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    }));
};

const changeStatus = async (req, res) => {
  res.send("status changed succcessfully");
};

//calculate gender percentage
const getGenderRatio = async (req, res) => {
  let { count: males } = await Employees.scope("checkMale").findAndCountAll({
    attributes: [
      [db.sequelize.fn("COUNT", db.sequelize.col("gender")), "count"],
    ],
  });
  let { count: females } = await Employees.scope("checkFemale").findAndCountAll(
    {
      attributes: [
        [db.sequelize.fn("COUNT", db.sequelize.col("gender")), "count"],
      ],
    }
  );

  const response = [
    {
      id: 0,
      value: males,
      label: "male",
    },
    {
      id: 1,
      value: females,
      label: "female",
    },
  ];

  console.log(males, females);
  res.send(response);
};

//calculate workStatus percentage
const getWorkStatusRatio = async (req, res) => {
  let data = await WorkStatus.findAll({
    attributes: [
      "id",
      ["workState", "label"],
      [db.Sequelize.fn("COUNT", db.Sequelize.col("Employees.id")), "value"],
    ],
    include: [{ model: Employees, attributes: [] }],
    group: ["WorkStatus.id"],
  });

  console.log(data);

  res.send(data);
};

module.exports = {
  checkDepartment,
  getAllEmployees,
  createEmployee,
  login,
  updateEmployee,
  changeStatus,
  adminUpdateEmployee,
  getGenderRatio,
  getWorkStatusRatio,
};
