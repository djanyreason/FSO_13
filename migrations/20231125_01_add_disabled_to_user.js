const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('bloglistusers', 'disabled', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('bloglistusers', 'disabled');
  }
};
