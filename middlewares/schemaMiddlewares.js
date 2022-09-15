import joi from 'joi';

function signUpSchema(req, res, next) {
    const schema = joi.object({
        name: joi.string().empty().required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(8).required(),
        confirm_password: joi.ref('password')
    });

    const validation = schema.validate(req.body, { abortEarly: false });
 
    if(validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        res.status(422).send(errors);
        return;
    }

    next();
}

export {
    signUpSchema
}