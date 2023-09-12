'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'clinics',
      'userManagerId',
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        //onUpdate: 'CASCADE'
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('clinics', 'userManagerId');
  }
};
