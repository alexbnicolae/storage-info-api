import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { initPassport } from './initPassport';
import authRouter from './src/routes/auth';
import contentRouter from './src/routes/content';
import wordfileRouter from './src/routes/wordfile';
import userRouter from './src/routes/user';
import noteRouter from './src/routes/note';
import dataRouter from './src/routes/data';
import * as fs from 'fs';
import * as path from 'path';
import { GoogleDriveService } from './src/services/google-drive/google-drive.service';

dotenv.config();

const bodyParser = require('body-parser');
const helmet = require("helmet");
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(helmet());
//init passport
initPassport(app);


// CORS policy
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.m7cqcio.mongodb.net/${process.env.MONGO_DB_DATABASE_NAME}?retryWrites=true&w=majority`);

mongoose.connection
.once("open", () => console.log("We are connected"))
.on('error', (error: any) => console.log(error))


app.use('/', authRouter);
app.use('/content', contentRouter);
app.use('/wordfile', wordfileRouter);
app.use('/note', noteRouter);
app.use('/user', userRouter);
app.use('/data', dataRouter);

// const driveClientId = process.env.GMAIL_APP_ID || '';
// const driveClientSecret = process.env.GMAIL_APP_SECRET || '';
// const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || '';
// const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || '';

// (async () => {
//   const googleDriveService = new GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken);

//   const finalPath = path.resolve(__dirname, '../public/SpaceX.jpg');
//   const folderName = 'Picture';

//   if (!fs.existsSync(finalPath)) {
//     throw new Error('File not found!');
//   }

//   let folder = await googleDriveService.searchFolder(folderName).catch((error) => {
//     console.error(error);
//     return null;
//   });

//   if (!folder) {
//     folder = await googleDriveService.createFolder(folderName);
//   }

//   await googleDriveService.saveFile('SpaceX', finalPath, 'image/jpeg', folder?.id).catch((error) => {
//     console.error(error);
//   });

//   console.info('File uploaded successfully!');

//   // Delete the file on the server
//   fs.unlinkSync(finalPath);
// })();
