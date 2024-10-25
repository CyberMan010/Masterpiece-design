'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, update all existing user_type values to either 'admin' or 'user'
    await queryInterface.sequelize.query(`
      UPDATE users
      SET user_type = CASE
        WHEN user_type = 'admin' THEN 'admin'
        ELSE 'user'
      END
    `);

    // Then, alter the column to be an ENUM
    await queryInterface.changeColumn('users', 'user_type', {
      type: Sequelize.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // If you need to revert, first change back to STRING
    await queryInterface.changeColumn('users', 'user_type', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Then remove the ENUM type
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS enum_users_user_type;
    `);
  }
};
