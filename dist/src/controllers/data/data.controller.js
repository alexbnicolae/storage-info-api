"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDataController = exports.editDataController = exports.getDataController = void 0;
const data_service_1 = require("../../services/data/data.service");
const getToken_1 = require("../../utils/getToken");
const getDataController = async (req, res) => {
    // verify if the user sent the data correctly
    // const { error, value } = editWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    let resProcessingData = await (0, data_service_1.getDataService)(req.body, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.getDataController = getDataController;
const editDataController = async (req, res) => {
    // verify if the user sent the data correctly
    // const { error, value } = editWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    let resProcessingData = await (0, data_service_1.editDataService)(req.body, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.editDataController = editDataController;
const deleteDataController = async (req, res) => {
    // verify if the user sent the data correctly
    // const { error, value } = editWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    let resProcessingData = await (0, data_service_1.deleteDataService)(req.body, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.deleteDataController = deleteDataController;
