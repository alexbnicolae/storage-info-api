"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataController = void 0;
const data_service_1 = require("../../services/data/data.service");
const getToken_1 = require("../../utils/getToken");
const getDataController = async (req, res) => {
    // verify if the user sent the data correctly
    // const { error, value } = editWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let resProcessingData = await (0, data_service_1.getDataService)(req.body, token);
    return res.json({ data: resProcessingData });
};
exports.getDataController = getDataController;
