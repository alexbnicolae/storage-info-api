"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteFileController = exports.ediNoteController = exports.getNoteController = exports.getNotesController = exports.createNoteController = void 0;
const note_service_1 = require("../../services/note/note.service");
const getToken_1 = require("../../utils/getToken");
const createNoteController = async (req, res) => {
    // verify if the user sent the data correctly
    // const { error, value } = createContentValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if (req.headers["platform"].toLowerCase().includes("mobile"))
        isMobile = true;
    // process data
    let resProcessingData = await (0, note_service_1.createNoteService)(req.body, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.createNoteController = createNoteController;
const getNotesController = async (req, res) => {
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if (req.headers["platform"].toLowerCase().includes("mobile"))
        isMobile = true;
    let resProcessingData = await (0, note_service_1.getNotesService)(req.body.parentId, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.getNotesController = getNotesController;
const getNoteController = async (req, res) => {
    let resProcessingData = await (0, note_service_1.getNoteService)(req.body.id);
    return res.json({ data: resProcessingData });
};
exports.getNoteController = getNoteController;
const ediNoteController = async (req, res) => {
    // verify if the user sent the data correctly
    // const { error, value } = editWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if (req.headers["platform"].toLowerCase().includes("mobile"))
        isMobile = true;
    let resProcessingData = await (0, note_service_1.editNoteService)(req.body, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.ediNoteController = ediNoteController;
const deleteNoteFileController = async (req, res) => {
    // verify if the user sent the data correctly
    // const { error, value } = deleteWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    let resProcessingData = await (0, note_service_1.deleteNoteFileService)(req.body.id);
    return res.json({ data: resProcessingData });
};
exports.deleteNoteFileController = deleteNoteFileController;
