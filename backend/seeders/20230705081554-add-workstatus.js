"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("workstatuses", [
      {
        workState: "WFO",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        workState: "WFH",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        workState: "FULL TIME",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        workState: "HALF TIME",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("workstatuses", null, {});
  },
};
