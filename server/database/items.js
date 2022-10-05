import { Sequelize, DataTypes } from 'sequelize';
import { db } from '../config.js';

const sequelize = new Sequelize(db.schema, db.user, db.password, {
  dialect: db.type,
  logging: false,
});

const Item = sequelize.define(
  db.table,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT('tiny'),
    },
  },
  {
    timestamps: false,
  }
);

export default Item;
