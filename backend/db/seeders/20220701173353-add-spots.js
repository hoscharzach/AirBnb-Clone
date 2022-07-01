'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        // id: 1,
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        numReviews: 1060,
        avgStarRating: 4.67,
        previewImage: "http://tinyurl.com/y56knttz"
      },
      {
        // id: 2,
        ownerId: 1,
        address: "1375 E Buena Vista Dr",
        city: "Orlando",
        state: "Florida",
        country: "United States of America",
        lat: 81.5707,
        lng: 28.3772,
        name: "Walt Disney World Resort",
        description: "Mickey Mouse lives here or something",
        price: 1000000,
        numReviews: null,
        avgStarRating: null,
        previewImage: "https://d23.com/app/uploads/2016/09/1180-x-600-092916_wdw-45th-45-photos-gallery.jpg"
        // createdAt: "2021-11-19 20:39:36",
        // updatedAt: "2021-11-19 20:39:36",
        // previewImage: "image url"
      },
    ])

  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    await queryInterface.bulkDelete('Spots', {
      name: {
        [Op.in]: ["Walt Disney World Resort", "App Academy"]
      }
    })
  }
};
