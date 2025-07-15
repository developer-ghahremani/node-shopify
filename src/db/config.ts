import { Sequelize } from "sequelize";
// import { User } from "../db/models/user.model";

export const sequelize = new Sequelize("TestDb", "sa", "6894100", {
  dialect: "sqlite",
  host: "localhost",
  // port: 30000,
  // models: [User], // or path to all models: [`${__dirname}/../models/*.ts`]
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};
