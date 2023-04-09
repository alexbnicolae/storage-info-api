"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_controller_1 = require("../controllers/content/content.controller");
const contentRouter = (0, express_1.Router)();
// create folder
contentRouter.post('/createFolder', content_controller_1.createFolderController);
// get content
contentRouter.post('/getContent', content_controller_1.getContentController);
exports.default = contentRouter;
