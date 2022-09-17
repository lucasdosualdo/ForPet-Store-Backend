import { ObjectId } from 'mongodb';
import db from '../db/db.js';

async function getItems(req, res) {
    const animal = req.query.for;
    const type = req.query.type;
    let page;
    let items;

    if(type && animal) {
        page= `for: ${animal}, type=${type}`;
    }
    
    try {
        if(page) {
            items = await db
                .collection('items')
                .find({page})
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

export {
    getItems,
    postFavorite,
    getFavorites
}
