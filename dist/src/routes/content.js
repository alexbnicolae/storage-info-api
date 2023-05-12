"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_controller_1 = require("../controllers/content/content.controller");
const verifyAuthorization_1 = require("../utils/verifyAuthorization");
const contentRouter = (0, express_1.Router)();
// create folder
contentRouter.post('/createFolder', verifyAuthorization_1.verifyAuthorization, content_controller_1.createFolderController);
// get content
contentRouter.post('/getContent', verifyAuthorization_1.verifyAuthorization, content_controller_1.getContentController);
// edit folder
contentRouter.put('/editFolder', verifyAuthorization_1.verifyAuthorization, content_controller_1.editFolderController);
// delete folder
contentRouter.post('/deleteFolder', verifyAuthorization_1.verifyAuthorization, content_controller_1.deleteFolderController);
exports.default = contentRouter;
