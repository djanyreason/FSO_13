const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bloglistuserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'bloglistusers', key: 'id' }
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' }
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_lists'
  }
);

module.exports = ReadingList;
