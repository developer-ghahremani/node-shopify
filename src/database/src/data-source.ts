import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  username: "sa",
  password: "6894100",
  database: "Shopify-local",
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
  options: {
    trustServerCertificate: true,
    instanceName: "SQLSERVER2022",
  },
});

export const userDataSource = AppDataSource.getRepository(User);
