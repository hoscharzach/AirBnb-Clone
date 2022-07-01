'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsToMany(models.User, {
        through: models.Booking
      })

      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner'
      })

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        as: 'Reviews'
      })

      Spot.hasMany(models.Image, {
        foreignKey: 'spotId',
        as: 'Pics'
      })
    }
  }
  Spot.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    numReviews: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    avgStarRating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    previewImage: {
      type: DataTypes.STRING,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
