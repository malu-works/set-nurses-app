'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'scales',
      'periodId',
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'periods', key: 'id' },
        onUpdate: 'CASCADE'
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('scales', 'periodId');
  }
};
