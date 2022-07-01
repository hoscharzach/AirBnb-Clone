'use strict';

const { query } = require("express");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        type: 'spot',
        imageUrl: 'http://tinyurl.com/yekxv88f',
        spotId: 2,
        reviewId: null,
        userId: 1
      },
      {
        type: 'spot',
        imageUrl: 'http://tinyurl.com/yekxv88f',
        spotId: 2,
        reviewId: null,
        userId: 1
      },
      {
        type: 'spot',
        imageUrl: 'http://tinyurl.com/yekxv88f',
        spotId: 2,
        reviewId: null,
        userId: 1
      },
      {
        type: 'spot',
        imageUrl: 'http://tinyurl.com/yekxv88f',
        spotId: 2,
        reviewId: null,
        userId: 1
      },
    ])
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Images', {
    type: 'spot'
  })
  }
};
