'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        content: "Here's a review of Disney World. It was pretty great. Went on Space Mountain",
        stars: 5,
        userId: 1,
        spotId: 2, // disney owned by 2
      },
      {
        content: "Here's a review of App Academy: Very stressful, but very fun. Learned a lot.",
        stars: 4,
        userId: 2,
        spotId: 1, // app owned by 1
      },
      {
        content: "Great experience, highly recommend this place.",
        stars: 5,
        userId: 3,
        spotId: 1, // app owned by 1
      },
      {
        content: "Here's a review of Disney World: Hated it, was straight up terrible. Seagull stole my lunch.",
        stars: 1,
        userId: 3,
        spotId: 2, // disney owned by 2
      },
      {
        content: "There was a dog at the top of the mountain. 'nuff said.",
        stars: 5,
        userId: 2,
        spotId: 3, // altus owned by 3
      },
      {
        content: "Thought the slicy rolling coffins thing was just a gag, but no those things are DANGEROUS. Avoid this place at all costs, I don't even know how this listing is legal...",
        stars: 1,
        userId: 1,
        spotId: 3, // altus owned by 3
      },
      {
        content: "Beautiful park, highly recommend checking this place out!",
        stars: 1,
        userId: 1,
        spotId: 6, // yellowstone owned by 3
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {
      userId: [2, 1, 3]
    })
  }
};
