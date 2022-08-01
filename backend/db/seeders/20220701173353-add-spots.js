'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "456 Python Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        previewImage: "https://media-exp1.licdn.com/dms/image/C4D1BAQFiqzOIvGIz2g/company-background_10000/0/1519798381024?e=2147483647&v=beta&t=rsqbd1yDMlHUC_EewNf3JO0WEUwITCKRUMqoAR-K6Ek"
      },
      {
        ownerId: 2,
        address: "123 Disney Lane",
        city: "Orlando",
        state: "Florida",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Disney World",
        description: "Place where all your dreams come true",
        price: 123,
        previewImage: "https://mediaim.expedia.com/localexpert/459711/39b0311d-043d-4aaa-93c7-d0e0dde7eb6b.jpg?impolicy=resizecrop&rw=1005&rh=565"
      },
      {
        ownerId: 3,
        address: "Altus Plateau",
        city: "Mount",
        state: "Gelmir",
        country: "The Lands Between",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Mount Gelmir",
        description: "Beautiful scenic path with tons of ladders, slicy rolling coffins, and a fully grown fallingstar beast that you just can't find anywhere else.",
        price: 99,
        previewImage: "https://www.gamespot.com/a/uploads/scale_super/1647/16470614/3950788-eldenringburntminorerdtree.jpg"
      },
      {
        ownerId: 1,
        address: "301 Main St",
        city: "Graysville",
        state: "Alabama",
        country: "United States of America",
        lat: 33.63,
        lng: -86.91,
        name: "Random Place in Alabama",
        description: "I don't know it's just a house",
        price: 50,
        previewImage: "https://www.territorysupply.com/wp-content/uploads/2020/12/creekside-airbnb-alabama.jpg"

      },
      {
        ownerId: 2,
        address: "1331 Pennsylvania Avenue",
        city: "Washington",
        state: "DC",
        country: "United States of America",
        lat: 38.8966,
        lng: 77.03,
        name: "Marriot Hotel",
        description: "It's a hotel... but on airbnb",
        price: 200,
        previewImage: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/112486687.jpg?k=92d57c0b4d6b92f6c49191a2b79e3b732040de68d5ab55fda673ac64b7277bcb&o=&hp=1"

      },
      {
        // id: 2,
        ownerId: 3,
        address: "2 Officers Row",
        city: "Yellowstone Park",
        state: "Wyoming",
        country: "United States of America",
        lat: 44.43,
        lng: -110.575620,
        name: "Yellowstone National Park",
        description: "Great view come see the animals and stuff",
        price: 250,
        previewImage: "https://cdn.crazyfamilyadventure.com/wp-content/uploads/2021/10/OldFaithfulTrail.jpg?strip=all&lossy=1&resize=840%2C630&ssl=1"

      },
    ])

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
      ownerId: [1,2,3]
    })
  }
};
