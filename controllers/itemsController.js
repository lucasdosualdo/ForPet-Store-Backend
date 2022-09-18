import { ObjectId } from 'mongodb';
import db from '../db/db.js';

async function getItems(req, res) {
    let items;
    const params = res.locals.params;

    try {
        if(params) {
            items = await db
                .collection('items')
                .find({for: params.pet, type: params.type})
                .toArray();
        } else {
            items = await db
                .collection('items')
                .find()
                .toArray();
        }

        res.send(items);

    } catch(error) {
        res.status(500).send(error.message);
    }
}

async function postFavorite(req, res) {
    const item = res.locals.item;
    const session = res.locals.session;
    const favorite = res.locals.favorite;

    try {
        if(favorite === false) {
            await db 
                .collection('favorites')
                .insertOne({
                    itemId: item._id,
                    userId: session.userId,
                    name: item.name,
                    for: item.for,
                    type: item.type,
                    about: item.about,
                    price: item.price,
                    brand: item.brand,
                    image: item.image
                });
        } else {
            await db 
                .collection('favorites')
                .deleteOne({itemId: ObjectId(item._id)});
        }
        
        res.sendStatus(200);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

async function getFavorites(req, res) {
    const session = res.locals.session;

    try {
        const favorites = await db
            .collection('favorites')
            .find({userId: session.userId})
            .toArray();

        res.send(favorites);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

async function getCathegories(req, res) {
    const pet = req.params.for;

    try {
        const cathegories = await db
            .collection('cathegories')
            .findOne({pet: pet});
        
        res.send(cathegories.types);
    } catch(error) {
        res.status(500).send(error.message);
    }

}

async function getHistory(req, res) {
    const session = res.locals.session;

    try {
        const history = await db
            .collection('history')
            .find({userId: session.userId})
            .toArray();

        res.send(history);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

async function getOrder(req, res) {
    const { orderId } = req.params;
    const session = res.locals.session;

    try {
        const order = await db
            .collection('purchasedItems')
            .find({_id: ObjectId(order.orderId), userId: session.userId});

        res.send(order);
    } catch(error) {
        res.status(500).send(error.message);
    }
}



export {
    getItems,
    postFavorite,
    getFavorites,
    getCathegories,
    getHistory,
    getOrder
}