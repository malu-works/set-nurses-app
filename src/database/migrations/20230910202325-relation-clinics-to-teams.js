'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'teams',
      'clinicId',
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'clinics', key: 'id' },
        onUpdate: 'CASCADE'
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('teams', 'clinicId');
  }
};
