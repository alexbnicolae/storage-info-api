import { Router } from 'express';
import { verifyAuthorization } from '../utils/verifyAuthorization';
import { createNoteController, deleteNoteFileController, ediNoteController, getNoteController, getNotesController } from '../controllers/note/note.controller';

const noteRouter = Router();

// create note
noteRouter.post('/createNote', verifyAuthorization, createNoteController);

// get notes
noteRouter.post('/getNotes', verifyAuthorization, getNotesController);

// get notes
noteRouter.post('/getNote', verifyAuthorization, getNoteController);

// edit note
noteRouter.put('/editNote', verifyAuthorization, ediNoteController);
  
// delete note
noteRouter.post('/deleteNote', verifyAuthorization, deleteNoteFileController);

export default noteRouter;
