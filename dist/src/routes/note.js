"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyAuthorization_1 = require("../utils/verifyAuthorization");
const note_controller_1 = require("../controllers/note/note.controller");
const noteRouter = (0, express_1.Router)();
// create note
noteRouter.post('/createNote', verifyAuthorization_1.verifyAuthorization, note_controller_1.createNoteController);
// get notes
noteRouter.post('/getNotes', verifyAuthorization_1.verifyAuthorization, note_controller_1.getNotesController);
// get notes
noteRouter.post('/getNote', verifyAuthorization_1.verifyAuthorization, note_controller_1.getNoteController);
// edit note
noteRouter.put('/editNote', verifyAuthorization_1.verifyAuthorization, note_controller_1.ediNoteController);
// delete note
noteRouter.post('/deleteNote', verifyAuthorization_1.verifyAuthorization, note_controller_1.deleteNoteFileController);
exports.default = noteRouter;
