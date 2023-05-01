import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./src/routers/authRouter.js";
import itemsRouter from "./src/routers/itemsRouter.js";
import sessionRouter from "./src/routers/sessionRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(itemsRouter);
app.use(sessionRouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

