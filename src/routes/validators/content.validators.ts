const Joi = require('joi');

export const createContentValidator = Joi.object({
    name: Joi.string().required(),
    type: Joi.number().required(),
    parentId: Joi.string().allow(null),
    encrypted: Joi.boolean(),
    folderPassword: Joi.string()
    // age: Joi.number().integer().min(0).max(150).required()
});

export const editContentValidator = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.number().required(),
    parentId: Joi.string().allow(null),
    encrypted: Joi.boolean(),
    folderPassword: Joi.string()
});

export const deleteContentValidator = Joi.object({
    id: Joi.string().required(),
});
