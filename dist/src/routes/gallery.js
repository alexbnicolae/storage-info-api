"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyAuthorization_1 = require("../utils/verifyAuthorization");
const gallery_controller_1 = require("../controllers/gallery/gallery.controller");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const galleryRouter = (0, express_1.Router)();
// create gallery file
galleryRouter.post('/uploadFile', (0, express_fileupload_1.default)({
    createParentPath: true,
}), verifyAuthorization_1.verifyAuthorization, gallery_controller_1.createGalleryController);
// delete note
galleryRouter.post('/deleteFile', verifyAuthorization_1.verifyAuthorization, gallery_controller_1.deleteGalleryController);
exports.default = galleryRouter;
