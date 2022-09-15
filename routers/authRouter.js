import express from "express";
import { signInUser, signUpUser } from "../controllers/authController.js";
import { signUpSchema } from "../middlewares/schemaMiddlewares.js";
import { isRegistered, allowLogin } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post("/sign-up", signUpSchema, isRegistered, signUpUser);
router.post("/sign-in", allowLogin, signInUser);

export default router;