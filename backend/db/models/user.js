'use strict';
const { Model, Validator} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, firstName, lastName } = this
      return { id, username, email, firstName, lastName }
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    }
    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id)
    }
    static async login({credential, password}) {
      const { Op } = require('sequelize')
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      })
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id)
      }
    }

    static async signup({ username, email, password, lastName, firstName }) {
      const hashedPassword = bcrypt.hashSync(password)
      const user = await User.create({
        username,
        firstName,
        lastName,
        email,
        hashedPassword
      })
      return await User.findByPk(user.id)
    }
    static associate(models) {
      User.hasMany(models.Review, {
        foreignKey: 'userId', hooks:true
      })

      User.hasMany(models.Booking, {
        foreignKey: 'userId',
      })

      User.hasMany(models.Spot, {
        foreignKey: 'ownerId', onDelete: 'CASCADE', hooks: true
      })

      // User.belongsToMany(models.Spot, {
      //   through: models.Booking,
      //   hooks: true
        // onDelete: 'CASCADE',
        // hooks: true
      // })

      User.hasMany(models.Image, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validation: {
        len: [4, 30],
        isNotEmail(val) {
          if(Validator.isEmail(val)) {
            throw new Error ("Must not be email.")
          }
        }
      }
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validation: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validation: {
        len: [60, 60],
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt',]
      }
    },
    scopes: {
      currentUser: {
        exclude: ['hashedPassword']
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
