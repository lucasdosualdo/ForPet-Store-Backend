import express from "express";
import { isLogged } from '../middlewares/authMiddlewares.js';
import { hasItem, isFavorite } from "../middlewares/itemsMiddlewares.js";
import { getItems, postFavorite, getFavorites } from "../controllers/itemsController.js";

const router = express.Router();
router.use(isLogged);

router.get("/items", getItems);
router.post("/favorites", hasItem, isFavorite, postFavorite);
router.get("/favorites", getFavorites);

export default router;