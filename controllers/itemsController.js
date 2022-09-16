import db from "../db/db.js";

async function getItems(req, res) {
  try {
    const items = await db.collection("items").find().toArray();

    res.send(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getItem(req, res) {
  const {itemId} = req.params;
  console.log(itemId);

  try {
    const item = await db.collection('items').findOne({ _id: itemId });
    res.send(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { getItems, getItem };
