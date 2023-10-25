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
import path from "path";
const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

dotenv.config();

import fs from "fs";

import bodyParser from 'body-parser';
import galleryRouter from './src/routes/gallery';
// const helmet = require("helmet");
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'files')));
// app.use(helmet());
//init passport
initPassport(app);


// CORS policy
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-origin-Opener-Policy','same-origin');
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
app.use('/gallery', galleryRouter);
 
export let rootPath = path.join(__dirname, 'files');