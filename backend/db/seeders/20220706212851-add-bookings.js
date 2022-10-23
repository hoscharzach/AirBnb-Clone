'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        startDate: "2022-08-01",
        endDate: "2022-08-02",
        userId: 1,
        spotId: 1
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {
      userId: [1, 2, 3]
    })
  }
};
