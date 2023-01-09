'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.User, { foreignKey: 'user_id' });
      Item.hasMany(models.Bid, { foreignKey: 'item_id' });
      // define association here
    }
  }
  Item.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      startOfAuction: DataTypes.DATE,
      endOfAuction: DataTypes.DATE,
      startPrice: DataTypes.FLOAT,
      user_id: DataTypes.INTEGER,
      winner_id: DataTypes.INTEGER,
      //   type: Sequelize.INTEGER,

      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'Users',
      //     key: 'id',
      //   },
      // },
      // winner_id: {
      //   type: Sequelize.INTEGER,
      //   defaultValue: null,
      // },
    },
    {
      sequelize,
      modelName: 'Item',
    }
  );
  return Item;
};
