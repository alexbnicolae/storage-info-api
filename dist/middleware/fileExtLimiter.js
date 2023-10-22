"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files;
        const fileExtensions = [];
        Object.keys(files).forEach(key => {
            fileExtensions.push(path_1.default.extname(files[key].name));
        });
        // Are the file extension allowed? 
        const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext));
        if (!allowed) {
            const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replace(",", ", ");
            return res.status(422).json({ status: "error", message });
        }
        next();
    };
};
module.exports = fileExtLimiter;
