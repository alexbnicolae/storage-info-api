"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyAuthorization_1 = require("../utils/verifyAuthorization");
const data_controller_1 = require("../controllers/data/data.controller");
const dataRouter = (0, express_1.Router)();
// get all data paginated
dataRouter.post('/getData', verifyAuthorization_1.verifyAuthorization, data_controller_1.getDataController);
// edit data
dataRouter.post('/editData', verifyAuthorization_1.verifyAuthorization, data_controller_1.editDataController);
// delete data
dataRouter.post('/deleteData', verifyAuthorization_1.verifyAuthorization, data_controller_1.deleteDataController);
exports.default = dataRouter;
