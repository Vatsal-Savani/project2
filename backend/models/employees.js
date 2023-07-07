"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employees.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      dob: DataTypes.DATE,
      doj: DataTypes.DATE,
      phone: DataTypes.INTEGER,
      deptId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Departments",
        },
      },
      wstId: {
        type: DataTypes.INTEGER,
        references: {
          model: "WorkStatus",
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Employees",
        },
      },
    },
    {
      sequelize,
      modelName: "Employees",
    }
  );
  return Employees;
};
