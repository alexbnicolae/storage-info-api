const Joi = require('joi');

export const createWordFileValidator = Joi.object({
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