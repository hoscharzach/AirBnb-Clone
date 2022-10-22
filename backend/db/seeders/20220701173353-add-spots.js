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
        ownerId: 5,
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
      {
        ownerId: 4,
        directions: "Inside Academy Gate Town",
        country: "Liurnia, The Lakes",
        realm: "The Lands Between",
        name: "Academy of Raya Lucaria",
        shortDescription: 'School full of wizards and a big orange wolf',
        longDescription: "This academy was founded by five brilliant minds who all shared the same goal of learning the secrets of strengthening magic. The queen of the region at the time, Rennala was a disciple of Lunar Magic, which explains why the academy was able to grow to such proportions: It had the backing of a queen at its disposal. The other four founders of the Academy were Master Lusat, Master Azur, and an unnamed set of twin sorcerers. ",
        price: 500,
        bosses: 3,
        bonfires: 6,
      },
      {
        ownerId: 6,
        directions: "High up Altus Plateau",
        country: "Altus",
        realm: "The Lands Between",
        name: "Volcano Manor",
        shortDescription: 'Luxurious manor right next to a volcano',
        longDescription: "Volcano Manor was built on Mt. Gelmir because the demigod Rykard, the oldest son of Radagon and Rennala, wanted to research new forms of magic using the volcano's magma. Rykard was a powerful sorcerer and became known for his disloyalty to the Golden Order and the Greater Will. Along with him, Volcano Manor was ruled by Tanith, who originally was a dancer that Rykard met and fell in love with in his travels.",
        price: 2000,
        bosses: 5,
        bonfires: 8,
      },
    ])

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
      ownerId: [1, 2, 3, 4, 5]
    })
  }
};
