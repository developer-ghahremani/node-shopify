import "dotenv/config";
import bodyParse from "body-parser";
import express from "express";
import { mainMiddleware } from "./middleware/main.middleware";
import routes from "./routes";

const app = express();
const port = process.env.PORT;

app.use(bodyParse.json());
app.use(mainMiddleware);
app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
