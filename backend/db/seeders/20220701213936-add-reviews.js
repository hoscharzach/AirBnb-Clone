'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [

      // owned by merchant kale, reviewed by demo user
      {
        content: "I visited this abandoned church during my travels to the Stormveil Castle, and Merhant Kale was a fantastic host. Not only is the whole place a haven from enemies, but he also runs a nice side gig selling useful odds and ends. I purchased myself a cookbook, and plan on using it in the near future! ",
        stars: 5,
        userId: 1,
        spotId: 1,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {
      userId: [1]
    })
  }
};
