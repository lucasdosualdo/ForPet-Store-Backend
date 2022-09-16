import db from "../db/db.js";

async function getItems(req, res) {
  try {
    const items = await db.collection("items").find().toArray();

    res.send(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { getItems };
