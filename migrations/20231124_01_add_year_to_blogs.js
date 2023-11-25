const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        checkYear(yearWritten) {
          const rightNow = new Date();
          if (yearWritten > rightNow.getFullYear())
            throw new Error('Year must not be in the future');
          else if (yearWritten < 1991)
            throw new Error('Year must be at least 1991');
        }
      }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year');
  }
};
