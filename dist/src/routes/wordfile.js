"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wordfile_controller_1 = require("../controllers/wordfile/wordfile.controller");
const wordfileRouter = (0, express_1.Router)();
// create file
wordfileRouter.post('/createWordFile', wordfile_controller_1.createWordFileController);
// get file
wordfileRouter.post('/getContent', wordfile_controller_1.getWordFileController);
exports.default = wordfileRouter;
