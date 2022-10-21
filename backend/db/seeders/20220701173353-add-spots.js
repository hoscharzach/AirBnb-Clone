'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 2,
        directions: "Just past the Tree Sentinel",
        country: "Limgrave",
        realm: "The Lands Between",
        name: "Church of Elleh",
        shortDescription: 'Entire abandoned church',
        longDescription: "You are a Tarnished, I can see it. And I can also see... That you're not after my throat. Then why not purchase a little something? There's a perfectly convenient site of grace right over there, and I sell all kinds of useful goodies",
        price: 1000,
        bonfires: 1,
        bosses: 0,
      },
      {
        ownerId: 3,
        directions: "Unknown",
        country: "Unknown",
        realm: "Unknown",
        name: "Roundtable Hold",
        shortDescription: 'Cozy palace with all the amenities',
        longDescription: 'The Roundtable Hold is a haven for all Tarnished to recover after battle, share knowledge, seek guidance from the Two Fingers, and improve their gear. As such, its main purpose is to preserve the Golden Order, which is only proven by the fact that it becomes derelict and abandoned after the burning of the Erdtree. Come upgrade your weapons, bells and armor. Step down into the lobby to find a surprise invader!',
        price: 1,
        bonfires: 1,
        bosses: 1,
      },
      {
        ownerId: 4,
        directions: "Northeast Lakes",
        country: "Liurnia, The Lakes",
        realm: "The Lands Between",
        name: "Church of Vows",
        shortDescription: 'Quaint and ancient church',
        longDescription: "It is here, at the Church of Vows, that the great houses of the Erdtree and the Moon were joined by the matrimonial bond between red-haired Radagon and Rennala of the Full Moon. That is why it holds in view the monuments of both houses, the Erdtree of the Capital and the Academy of Raya Lucaria.",
        price: 1000,
        bosses: 0,
        bonfires: 1,
      },
    ])

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
      ownerId: [1, 2, 3, 4]
    })
  }
};
