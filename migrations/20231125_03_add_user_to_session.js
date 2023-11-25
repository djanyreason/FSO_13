const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('bloglist_sessions', 'bloglistuser_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'bloglistusers', key: 'id' }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('bloglist_sessions', 'bloglistuser_id');
  }
};
