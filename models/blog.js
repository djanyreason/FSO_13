const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: DataTypes.TEXT
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    year: {
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
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
  }
);

module.exports = Blog;
