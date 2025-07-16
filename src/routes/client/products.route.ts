import { Router } from "express";

const productRoutes = Router();

productRoutes.get("/", async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default productRoutes;
