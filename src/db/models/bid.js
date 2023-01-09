'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bid.belongsTo(models.User, { foreignKey: 'user_id' });
      Bid.belongsTo(models.Item, { foreignKey: 'item_id' });
      // define association here
    }
  }
  Bid.init(
    {
      item_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Bid',
    }
  );
  return Bid;
};
