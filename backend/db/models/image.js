'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    static associate(models) {
      Image.belongsTo(models.Spot, {
        foreignKey: 'spotId',
      })
    }
  }
  Image.init({
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
