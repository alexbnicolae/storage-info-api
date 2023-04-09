const Joi = require('joi');

export const createContentValidator = Joi.object({
    name: Joi.string().required(),
    type: Joi.number().required(),
    parentId: Joi.string().allow(null),
    encrypted: Joi.boolean(),
    folderPassword: Joi.string()
    // age: Joi.number().integer().min(0).max(150).required()
});

