const Joi = require('joi');

const validationOptions = {
    stripUnknown: true,
    abortEarly: false
}

const schemas = {
    createNewCard: Joi.object().keys({
        title: Joi.string().required().label('Hey man! i expected title to be here...'),
        subtitle: Joi.string().required(),
        description: Joi.string().options(),
        phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'number' }).required(),
        email: Joi.string().email().required(),
        web: Joi.string().uri().required(),
        image: Joi.object().keys({
            url: Joi.string().required(),
            alt: Joi.string().optional(),
        }),
        address: Joi.object().keys({
            state: Joi.string().required(),
            country: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.number().required(),
            zip: Joi.string().required(),
        }),
        bizNumber: Joi.number().required(),
    }).options(validationOptions),
    updateCard: Joi.object().keys({
        title: Joi.string().optional(),
        subtitle: Joi.string().optional(),
        description: Joi.string().options(),
        phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'number' }).optional(),
        email: Joi.string().email().optional(),
        web: Joi.string().optional(),
        image: Joi.object().keys({
            url: Joi.string().optional(),
            alt: Joi.string().optional(),
        }),
        address: Joi.object().keys({
            state: Joi.string().optional(),
            country: Joi.string().optional(),
            city: Joi.string().optional(),
            street: Joi.string().optional(),
            houseNumber: Joi.number().optional(),
            zip: Joi.string().optional(),
        }),
        bizNumber: Joi.number().optional(),
    }).options(validationOptions).min(1).message("The request's body must inclode at-least one valid key"),
    searchCard: Joi.object().keys({
        searchTerm: Joi.string().min(3).max(30).required(),
        searchFields: Joi.array()
            .items(Joi.string().valid("title", "subtitle", "description"))
            .min(1)
            .required(),
    }).options(validationOptions),
}

module.exports = schemas;