const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class BloglistSession extends Model {}

BloglistSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'bloglist_sessions',
    scopes: {
      user(id) {
        return {
          where: {
            bloglistuserId: id
          }
        };
      }
    }
  }
);

module.exports = BloglistSession;
