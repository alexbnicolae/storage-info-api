"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wordfile_controller_1 = require("../controllers/wordfile/wordfile.controller");
const verifyAuthorization_1 = require("../utils/verifyAuthorization");
const wordfileRouter = (0, express_1.Router)();
// create file
wordfileRouter.post('/createWordFile', verifyAuthorization_1.verifyAuthorization, wordfile_controller_1.createWordFileController);
// get file
wordfileRouter.post('/getContent', verifyAuthorization_1.verifyAuthorization, wordfile_controller_1.getWordFileController);
// edit file
wordfileRouter.put('/editWordfile', verifyAuthorization_1.verifyAuthorization, wordfile_controller_1.editWordFileController);
//delete file
wordfileRouter.post('/deleteWordfile', verifyAuthorization_1.verifyAuthorization, wordfile_controller_1.deleteWordFileController);
exports.default = wordfileRouter;
