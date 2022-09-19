import { ObjectId } from "mongodb";
import db from "../db/db.js";

async function getItems(req, res) {
  let items;
  const params = res.locals.params;

  try {
    if (params) {
      items = await db
        .collection("items")
        .find({ for: params.pet, type: params.type })
        .toArray();
    } else {
      items = await db.collection("items").find().toArray();
    }

    res.send(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function postFavorite(req, res) {
  const item = res.locals.item;
  const session = res.locals.session;
  const favorite = res.locals.favorite;

  try {
    if (favorite === false) {
      await db.collection("favorites").insertOne({
        itemId: item._id,
        userId: session.userId,
        name: item.name,
        for: item.for,
        type: item.type,
        about: item.about,
        price: item.price,
        brand: item.brand,
        image: item.image,
      });
    } else {
      await db
        .collection("favorites")
        .deleteOne({ itemId: ObjectId(item._id) });
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getFavorites(req, res) {
  const session = res.locals.session;

  try {
    const favorites = await db
      .collection("favorites")
      .find({ userId: session.userId })
      .toArray();

    res.send(favorites);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getCathegories(req, res) {
  const pet = req.params.for;

  try {
    const cathegories = await db
      .collection("cathegories")
      .findOne({ pet: pet });

    res.send(cathegories.types);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getHistory(req, res) {
  const session = res.locals.session;

  try {
    const history = await db
      .collection("purchasedItems")
      .find({ userId: session.userId })
      .toArray();

    res.send(history);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getOrder(req, res) {
  const { orderId } = req.params;
  const session = res.locals.session;

  try {
    const order = await db
      .collection("purchasedItems")
      // .find({ _id: ObjectId(order.orderId), userId: session.userId });
      .find({ _id: ObjectId(orderId) });
    res.send(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function postPurchase(req, res) {
  try {
    const purchase = await db.collection("purchasedItems").insertOne(req.body);
    res.status(201).send(purchase);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function postCart(req, res) {
  const { itemId, quantify, totalValue } = req.body;
  try {
    const searchItem = await db.collection("cart").findOne({ itemId });
    if (!searchItem) {
      const addCart = await db.collection("cart").insertOne(req.body);
      res.status(201).send(addCart);
      return;
    }
    const updateQuantify = Number(searchItem.quantify) + quantify;
    const updateTotalValue = (
      Number(searchItem.totalValue) + Number(totalValue)
    ).toFixed(2);
    console.log(updateQuantify, updateTotalValue);
    const updateItem = await db
      .collection("cart")
      .updateOne(
        { itemId },
        { $set: { quantify: updateQuantify, totalValue: updateTotalValue } }
      );
    res.status(201).send(updateItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getCart(req, res) {
  const session = res.locals.session;
  try {
    const getCartItems = await db
      .collection("cart")
      .find({ email: session.email })
      .toArray();
    res.status(201).send(getCartItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteItem(req, res) {
  const itemId = req.params.itemId;
  console.log(itemId);
  try {
    await db.collection("cart").deleteOne({ itemId });
    res.status(201).send("item excluído");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export {
  getItems,
  postFavorite,
  getFavorites,
  getCathegories,
  getHistory,
  getOrder,
  postPurchase,
  postCart,
  getCart,
  deleteItem,
};
