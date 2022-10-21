'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'Lition',
        profilePic: '',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: 'Merchant Kalé',
        lastName: 'Kale',
        profilePic: 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/merchant-kale-npc-elden-ring-wiki-guide.jpg',
        username: 'MerchantKalé',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        firstName: 'Master Hewg',
        lastName: 'Hewg',
        profilePic: 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/blacksmith_hewg_elden_ring_wiki_guide_300px.jpg',
        username: 'SmithingMaster',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user3@user.io',
        firstName: 'Queen Rennala',
        lastName: 'Rennala',
        profilePic: 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/rennala_queen_of_the_full_moon_bosses_elden_ring_wiki_600px.jpg',
        username: 'Rennala',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user4@user.io',
        firstName: 'Miriel, Pastor of Vows',
        lastName: 'Miriel',
        profilePic: 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/mirel_pastor_of_vow.jpg',
        username: 'Miriel',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'user5@user.io',
        firstName: 'Tanith',
        lastName: 'Tanith',
        profilePic: 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/tanith_npc_elden_ring_wiki_guide_300x.jpg',
        username: 'Tanith',
        hashedPassword: bcrypt.hashSync('password6')
      }
    ]
    )
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op
    await queryInterface.bulkDelete('Users', {
      lastName: {
        [Op.in]: ['Lition', 'Kale', 'Hewg', 'Rennala', 'Miriel']
      }
    })
  }
};
