import "dotenv/config";
import bodyParse from "body-parser";
import express from "express";
import { mainMiddleware } from "./middleware/main.middleware";
import routes from "./routes";
import { AppDataSource } from "../database/src/data-source";

const app = express();
const port = process.env.PORT;

app.use(bodyParse.json());
app.use(mainMiddleware);
app.use("/api/v1", routes);

AppDataSource.initialize().then(
  () => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  },
  (error) => {
    console.error("❌ Database connection failed:", error);
  }
);
