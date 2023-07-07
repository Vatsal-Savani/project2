"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.department = require("./department")(sequelize, DataTypes);
db.address = require("./address")(sequelize, DataTypes);
db.employees = require("./employees")(sequelize, DataTypes);
db.workstatus = require("./workstatus")(sequelize, DataTypes);
db.role = require("./role")(sequelize, DataTypes);

db.employees.addScope("checkMale", {
  where: {
    gender: "male",
  },
});
db.employees.addScope("checkFemale", {
  where: {
    gender: "female",
  },
});

db.role.hasMany(db.employees, { foreignKey: "roleId" });
db.employees.belongsTo(db.role, { foreignKey: "roleId" });

db.employees.hasMany(db.address, { foreignKey: "empId" });
db.address.belongsTo(db.employees, { foreignKey: "empId" });

db.workstatus.hasMany(db.employees, { foreignKey: "wstId" });
db.employees.belongsTo(db.workstatus, { foreignKey: "wstId" });

db.department.hasMany(db.employees, { foreignKey: "deptId" });
db.employees.belongsTo(db.department, { foreignKey: "deptId" });

module.exports = db;
