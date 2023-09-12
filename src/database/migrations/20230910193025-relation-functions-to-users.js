'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users',
      'functionId',
      {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'functions', key: 'id' },
        //onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'functionId');
  }
};
