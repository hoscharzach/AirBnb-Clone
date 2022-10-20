'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 2,
        address: "Just past the Tree Sentinel",
        city: "Limgrave",
        state: "Limgrave",
        country: "The Lands Between",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Church of Elleh",
        shortDescription: 'Entire abandoned church',
        longDescription: "You are a Tarnished, I can see it. And I can also see... That you're not after my throat. Then why not purchase a little something? There's a perfectly convenient site of grace right over there, and I sell all kinds of useful goodies",
        price: 1000,
        bonfires: 1,
        bosses: 0,
        previewImage: "https://assets.reedpopcdn.com/2173.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/2173.jpg"
      },
      {
        ownerId: 3,
        address: "???",
        city: "Unknown",
        state: "Unknown",
        country: "Unknown",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Roundtable Hold",
        shortDescription: 'Cozy palace with all the amenities',
        longDescription: 'The Roundtable Hold is a haven for all Tarnished to recover after battle, share knowledge, seek guidance from the Two Fingers, and improve their gear. As such, its main purpose is to preserve the Golden Order, which is only proven by the fact that it becomes derelict and abandoned after the burning of the Erdtree. Come upgrade your weapons, bells and armor. Step down into the lobby to find a surprise invader!',
        price: 1,
        bonfires: 1,
        bosses: 1,
        previewImage: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/03/elden-ring-roundtable-hold.jpg"
      },
      {
        ownerId: 4,
        address: "Northeast Lakes",
        city: "Liurnia",
        state: "The Lakes",
        country: "The Lands Between",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Church of Vows",
        shortDescription: 'Quaint and ancient church',
        longDescription: "It is here, at the Church of Vows, that the great houses of the Erdtree and the Moon were joined by the matrimonial bond between red-haired Radagon and Rennala of the Full Moon. That is why it holds in view the monuments of both houses, the Erdtree of the Capital and the Academy of Raya Lucaria.",
        price: 1000,
        bosses: 0,
        bonfires: 1,
        previewImage: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/elden-ring/6/6b/Elden_Ring_Screenshot_2022.03.10_-_17.49.18.34.png?width=1280"
      },
    ])

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
      ownerId: [1, 2, 3, 4]
    })
  }
};
