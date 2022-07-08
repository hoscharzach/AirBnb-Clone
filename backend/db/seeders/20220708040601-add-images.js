'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        type: "review",
        imageUrl: "http://tinyurl.com/y56knttz",
        userId: 1,
        spotId: null,
        reviewId: 3
      },
      {
        type: "spot",
        imageUrl: "http://tinyurl.com/y56knttz",
        userId: 1,
        spotId: 2,
        reviewId: null
      },
      {
        type: "spot",
        imageUrl: "http://tinyurl.com/y56knttz",
        userId: 1,
        spotId: 1,
        reviewId: null
      },
      {
        type: "review",
        imageUrl: "http://tinyurl.com/y56knttz",
        userId: 2,
        spotId: null,
        reviewId: 4
      },

    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', {
      type: ['spot', 'review']
    })
  }
};
