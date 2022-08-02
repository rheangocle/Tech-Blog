const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class User extends Model {
  checkPassword(passAttempt) {
    return bcrypt.compareSync(passAttempt, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        length: [8, 20],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newData) => {
        newData.password = await bcrypt.hash(newData.password, 10);
        return newData;
      },
    },
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'user',
  }
)

module.exports = User;