import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public location!: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT.UNSIGNED,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'items',
    sequelize,
  },
);

export default Product;
