'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        content: "Here's a review of Disney World. It was pretty great. Went on Space Mountain",
        stars: 5,
        userId: 1,
        spotId: 2,
      },
      {
        content: "Here's a review of App Academy: Very stressful, but very fun. Learned a lot.",
        stars: 4.6,
        userId: 2,
        spotId: 1,
      },
      {
        content: "Here's a review of Disney World: Hated it, was straight up terrible. Seagull stole my lunch.",
        stars: 1,
        userId: 2,
        spotId: 2,
      },
      {
        content: "Went to Disney World to see Donald Duck, he wasn't there because he had food poisoning or something. The food was overpriced, but at least they had chicken.",
        stars: 3,
        userId: 3,
        spotId: 2,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {
      userId: [2, 1]
    })
  }
};
