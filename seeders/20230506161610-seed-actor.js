"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const actor = require("../data/actor.json");
    actor.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Actors", actor, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Actors", null, {});
  },
};
