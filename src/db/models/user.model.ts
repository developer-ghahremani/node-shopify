import { DataTypes } from "sequelize";
import { sequelize } from "../config";

export const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: true },
  lastName: { type: DataTypes.STRING, allowNull: true },
  age: { type: DataTypes.INTEGER, allowNull: true },
  createdAt: { type: DataTypes.DATE, allowNull: true },
  updatedAt: { type: DataTypes.DATE, allowNull: true },
});
