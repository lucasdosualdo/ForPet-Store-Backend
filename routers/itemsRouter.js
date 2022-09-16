import express from "express";
import { isLogged } from '../middlewares/authMiddlewares.js';
import { getItems, getItem } from "../controllers/itemsController.js";

const router = express.Router();
//router.use(isLogged);

router.get("/items", getItems);

router.get('/:itemId', getItem);

export default router;