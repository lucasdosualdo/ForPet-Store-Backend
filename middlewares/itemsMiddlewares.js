import db from '../db/db.js';
import { ObjectId } from 'mongodb';

async function hasItem(req, res, next) {
    const { id } = req.body;

    try {
        const item = await db
            .collection('items')
            .findOne({_id: ObjectId(id)});
        
        if(!item) {
            res.status(404).send('Não foi possível encontrar este item!');
            return;
        }

        res.locals.item = item;
    } catch(error) {
        res.status(500).send(error.message);
    }

    next();
}

async function isFavorite(req, res, next) {
    const { id } = req.body;
    const session = res.locals.session;

    try {
        const item = await db
            .collection('favorites')
            .findOne({itemId: ObjectId(id), userId: ObjectId(session.userId)});
        
        if(!item) {
            res.locals.favorite = false;
        } else {
            res.locals.favorite = true;
        }
    } catch(error) {
        res.status(500).send(error.message);
    }

    next();
}

export {
    hasItem,
    isFavorite
}