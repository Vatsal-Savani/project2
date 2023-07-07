"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init(
    {
      empId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Employees",
        },
      },
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      pincode: DataTypes.INTEGER,
      state: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
