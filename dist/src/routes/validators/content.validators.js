"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContentValidator = exports.editContentValidator = exports.createContentValidator = void 0;
const Joi = require('joi');
exports.createContentValidator = Joi.object({
    name: Joi.string().required(),
    type: Joi.number().required(),
    parentId: Joi.string().allow(null),
    encrypted: Joi.boolean(),
    folderPassword: Joi.string()
    // age: Joi.number().integer().min(0).max(150).required()
});
exports.editContentValidator = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.number().required(),
    parentId: Joi.string().allow(null),
    encrypted: Joi.boolean(),
    folderPassword: Joi.string()
});
exports.deleteContentValidator = Joi.object({
    id: Joi.string().required(),
});
