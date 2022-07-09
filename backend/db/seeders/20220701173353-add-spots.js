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
        previewImage: "http://tinyurl.com/y56knttz"
      },
      {
        // id: 2,
        ownerId: 2,
        address: "301 Main St",
        city: "Graysville",
        state: "Alabama",
        country: "United States of America",
        lat: 33.63,
        lng: -86.91,
        name: "Random Place in Alabama",
        description: "I don't know it's just a house",
        price: 50,
        previewImage: "preview-image"

      },
      {
        // id: 2,
        ownerId: 3,
        address: "1331 Pennsylvania Avenue",
        city: "Washington",
        state: "DC",
        country: "United States of America",
        lat: 38.8966,
        lng: 77.03,
        name: "Marriot Hotel",
        description: "It's a hotel... but on airbnb",
        price: 200,
        previewImage: "preview-image"

      },
      {
        // id: 2,
        ownerId: 1,
        address: "2 Officers Row",
        city: "Yellowstone Park",
        state: "Wyoming",
        country: "United States of America",
        lat: 44.43,
        lng: -110.575620,
        name: "Yellowstone National Park",
        description: "Great view come see the animals and stuff",
        price: 250,
        previewImage: "preview-image"

      },
    ])

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
      ownerId: [1,2,3]
    })
  }
};
