import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";
import itemsRouter from "./routers/itemsRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(itemsRouter);

app.listen(process.env.PORT_API, () => {
  console.log("listening on port 5000");
});

// OBS: arquivo .env:
// MONGO_URI=mongodb://localhost:27017
// MONGO_DB=project14-forpetstore
// PORT_API=5000
