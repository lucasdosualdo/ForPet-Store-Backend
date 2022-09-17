import express from "express";
import { isLogged } from "../middlewares/authMiddlewares.js";
import { getItems } from "../controllers/itemsController.js";

const router = express.Router();
//router.use(isLogged);

router.get("/items", getItems);

export default router;
