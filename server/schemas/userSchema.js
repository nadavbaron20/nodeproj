const Joi = require('joi');
const { create } = require('../models/User');

const validationOptions = {
    stripUnknown: true,
    abortEarly: false
}

const schemas = {
    createNewUser: Joi.object().keys({
        mane: Joi.object().keys({
            first: Joi.string().required(),
            middle: Joi.string().default(""),
            last: Joi.string().required(),
        }),
        phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'number' }).required(),
        email: Joi.string().email().required(),
        // password rules: at least one upper case latter, at least one lower case latter, at least one charecter case, at least one 7 charecters,
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%&*-]).{7,}$/, { name: 'password' }).required(),
        image: Joi.object().keys({
            url: Joi.string().required(),
            alt: Joi.string().optional(),
        }),
        address: Joi.object().keys({
            state: Joi.string().optional(),
            country: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.number().required(),
            zip: Joi.string().required(),
        }),
        isBusiness: Joi.boolean().required(),
    }).options(validationOptions),
    updateUser: Joi.object().keys({
        phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'number' }).optional(),
        email: Joi.string().email().required(),
        // password rules: at least one upper case latter, at least one lower case latter, at least one charecter case, at least one 7 charecters,
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%&*-]).{7,}$/, { name: 'password' }).required(),
        image: Joi.object().keys({
            url: Joi.string().required(),
            alt: Joi.string().optional().default("Profile image"),
        }),
        address: Joi.object().keys({
            state: Joi.string().optional(""),
            country: Joi.string().optional(),
            city: Joi.string().optional(),
            street: Joi.string().optional(),
            houseNumber: Joi.number().optional(),
            zip: Joi.string().optional(),
        }),
        isBusiness: Joi.boolean().required(),
    }).options(validationOptions).min(1).message("The request's body must inclode at-least one valid key"),
    login:
        Joi.object().keys({
            email: Joi.string().require(),
            // password rules: at least one upper case latter, at least one lower case latter, at least one charecter case, at least one 7 charecters,
            password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%&*-]).{7,}$/, { name: 'password' }).required(),
        }).options(validationOptions),
}

module.exports = schemas;