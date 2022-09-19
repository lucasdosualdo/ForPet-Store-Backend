import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
let db;

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  db = mongoClient.db(process.env.MONGO_DB);
} catch (error) {
  console.log(error);
}

export default db;
