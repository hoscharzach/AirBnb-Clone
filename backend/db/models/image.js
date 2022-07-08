'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    static associate(models) {
      Image.belongsTo(models.Review, {
        foreignKey: 'reviewId',
      })

      Image.belongsTo(models.Spot, {
        foreignKey: 'spotId',
      })

      Image.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Image.init({
    type: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
    },
    reviewId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
