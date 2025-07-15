import "reflect-metadata";
import bodyParse from "body-parser";
import express from "express";
import { mainMiddleware } from "./middleware/main.middleware";
import productRoutes from "./routes/products.route";

const app = express();
const port = 3000;

app.use(bodyParse.json());
app.use(mainMiddleware);

app.use("/products", productRoutes);
app.use((req, res) => {
  res.status(404).json({ message: "404 occurred" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
