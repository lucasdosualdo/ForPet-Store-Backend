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

function filter(req, res, next) {
    let pet = req.query.pet;
    let type = req.query.type; 
    let params;

    if(pet === 'dogs') pet = 'Cães';
    if(pet === 'cats') pet = 'Gatos';
    if(pet === 'birds') pet = 'Pássaros';
    if(pet === 'fish') pet = 'Peixes';
    if(pet === 'reptiles') pet = 'Répteis';
    if(pet === 'rodents') pet = 'Roedores';

    if( type && pet) {
        type = type.replace(/-/g, ' ');
        params = {
            pet: pet,
            type: type
        }
    }
    
    res.locals.params = params;

    next();
}

export {
    hasItem,
    isFavorite,
    filter
}