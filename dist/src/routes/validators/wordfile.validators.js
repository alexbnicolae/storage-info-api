"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWordFileValidator = exports.editWordFileValidator = exports.createWordFileValidator = void 0;
const Joi = require('joi');
exports.createWordFileValidator = Joi.object({
    name: Joi.string().required(),
    type: Joi.number().required(),
    parentId: Joi.string().allow(null),
    encrypted: Joi.boolean(),
    folderPassword: Joi.string(),
    content: Joi.object({
        word: Joi.object({
            value: Joi.string().required(),
            isRequired: Joi.boolean().required(),
            error: Joi.boolean()
        }),
        meaning: Joi.object({
            value: Joi.string().required(),
            isRequired: Joi.boolean().required(),
            error: Joi.boolean()
        }),
        partOfSpeech: Joi.object({
            value: Joi.string().required(),
            isRequired: Joi.boolean().required(),
            error: Joi.boolean()
        }),
        wordLanguage: Joi.object({
            value: Joi.string().allow(''),
            isRequired: Joi.boolean(),
            error: Joi.boolean()
        }),
        moreDetails: Joi.object({
            value: Joi.string().allow(''),
            isRequired: Joi.boolean(),
            error: Joi.boolean()
        }),
        optionalContent: Joi.object({
            value: Joi.boolean(),
            isRequired: Joi.boolean(),
            error: Joi.boolean()
        })
    })
});
exports.editWordFileValidator = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.number().required(),
    parentId: Joi.string().allow(null),
    encrypted: Joi.boolean(),
    folderPassword: Joi.string(),
    content: Joi.object({
        word: Joi.object({
            value: Joi.string().required(),
            isRequired: Joi.boolean().required(),
            error: Joi.boolean()
        }),
        meaning: Joi.object({
            value: Joi.string().required(),
            isRequired: Joi.boolean().required(),
            error: Joi.boolean()
        }),
        partOfSpeech: Joi.object({
            value: Joi.string().required(),
            isRequired: Joi.boolean().required(),
            error: Joi.boolean()
        }),
        wordLanguage: Joi.object({
            value: Joi.string().allow(''),
            isRequired: Joi.boolean(),
            error: Joi.boolean()
        }),
        moreDetails: Joi.object({
            value: Joi.string().allow(''),
            isRequired: Joi.boolean(),
            error: Joi.boolean()
        }),
        optionalContent: Joi.object({
            value: Joi.boolean(),
            isRequired: Joi.boolean(),
            error: Joi.boolean()
        })
    })
});
exports.deleteWordFileValidator = Joi.object({
    id: Joi.string().required(),
});
