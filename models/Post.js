const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Post extends Model { };

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'post'
  }
)

module.exports = Post;