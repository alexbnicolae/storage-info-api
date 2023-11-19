"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGalleryController = exports.createGalleryController = void 0;
const gallery_service_1 = require("../../services/gallery/gallery.service");
const getToken_1 = require("../../utils/getToken");
const createGalleryController = async (req, res) => {
    // verify if the user sent the data correctly
    // const { error, value } = createContentValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    var _a, _b;
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if ((_b = (_a = req.headers["platform"]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes("mobile"))
        isMobile = true;
    // process data
    let resProcessingData = await (0, gallery_service_1.createGalleryService)(req, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.createGalleryController = createGalleryController;
const deleteGalleryController = async (req, res) => {
    // verify if the user sent the data correctly
    // const { error, value } = deleteWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    let resProcessingData = await (0, gallery_service_1.deleteGalleryService)(req.body.id);
    return res.json({ data: resProcessingData });
};
exports.deleteGalleryController = deleteGalleryController;
