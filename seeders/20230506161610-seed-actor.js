"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const actor = require("../data/actor.json");
    actor.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Actors", actor, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Actors", null, {});
  },
};
