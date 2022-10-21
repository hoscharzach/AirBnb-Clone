'use strict';

const { query } = require("express");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666392540407.png',
        spotId: 1,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666392540453.png',
        spotId: 1,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666392540477.png',
        spotId: 1,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666392540513.png',
        spotId: 1,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666392540518.png',
        spotId: 1,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666392868084.png',
        spotId: 2,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666392868105.png',
        spotId: 2,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666392868109.png',
        spotId: 2,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666392868112.png',
        spotId: 2,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666392868114.png',
        spotId: 2,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666393175296.png',
        spotId: 3,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666393175316.png',
        spotId: 3,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666393175320.png',
        spotId: 3,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666393175324.png',
        spotId: 3,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666393175328.png',
        spotId: 3,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666394965097.png',
        spotId: 4,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666394965117.png',
        spotId: 4,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666394965121.png',
        spotId: 4,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666394965128.png',
        spotId: 4,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666394965124.png',
        spotId: 4,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666395631066.png',
        spotId: 5,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666395631084.png',
        spotId: 5,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666395631088.png',
        spotId: 5,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666395631091.png',
        spotId: 5,
      },
      {
        imageUrl: 'https://souls-bnb.s3.amazonaws.com/1666395631093.png',
        spotId: 5,
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', {
      spotId: 1
    })
  }
};
