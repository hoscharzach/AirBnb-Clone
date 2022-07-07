'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        startDate: "2022-08-01",
        endDate: "2022-08-02",
        userId: 1,
        spotId: 1
      },
      {
        startDate: "2022-08-04",
        endDate: "2022-08-06",
        userId: 1,
        spotId: 2
      },
      {
        startDate: "2022-08-04",
        endDate: "2022-08-06",
        userId: 1,
        spotId: 2
      },
      {
        startDate: "2022-08-30",
        endDate: "2022-09-07",
        userId: 2,
        spotId: 2
      },
      {
        startDate: "2022-08-15",
        endDate: "2022-08-20",
        userId: 3,
        spotId: 1
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', {
      userId: [1, 2, 3]
    })
  }
};
