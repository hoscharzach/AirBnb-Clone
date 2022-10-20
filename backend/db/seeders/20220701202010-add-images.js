'use strict';

const { query } = require("express");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        imageUrl: 'http://tinyurl.com/yekxv88f',
        spotId: 1,
      },
      // {
      //   type: 'spot',
      //   imageUrl: 'http://tinyurl.com/yekxv88fa',
      //   spotId: 2,
      //   reviewId: null,

      // },
      // {
      //   type: 'spot',
      //   imageUrl: 'http://tinyurl.com/yekxv88fasd',
      //   spotId: 2,
      //   reviewId: null,
      //   userId: 1
      // },
      // {
      //   type: 'spot',
      //   imageUrl: 'http://tinyurl.com/yekxv88fasd',
      //   spotId: 2,
      //   reviewId: null,
      //   userId: 2
      // },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', {
      spotId: 1
    })
  }
};
