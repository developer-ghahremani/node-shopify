import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  username: "sa",
  password: "6894100",
  database: "Shopify-local",
  synchronize: true,
  logging: false,
  //   entities: [User],
  migrations: [],
  subscribers: [],
  migrationsTableName: "custom_migration_table",
  options: {
    trustServerCertificate: true,
    instanceName: "SQLSERVER2022",
  },
});
