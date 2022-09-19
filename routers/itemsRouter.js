import express from "express";
import { isLogged } from "../middlewares/authMiddlewares.js";
import {
  hasItem,
  isFavorite,
  filter,
} from "../middlewares/itemsMiddlewares.js";
import {
  getItems,
  postFavorite,
  getFavorites,
  getCathegories,
  getHistory,
  getOrder,
  postPurchase,
  postCart,
  getCart
} from "../controllers/itemsController.js";

const router = express.Router();
router.use(isLogged);

router.get("/items", filter, getItems);
router.post("/favorites", hasItem, isFavorite, postFavorite);
router.get("/favorites", getFavorites);
router.get("/cathegories/:for", getCathegories);
router.get("/history", getHistory);
router.get("/order/:orderId", getOrder);
router.post("/purchase", postPurchase);
router.post("/cart", postCart);
router.get("/cart", getCart);


export default router;
