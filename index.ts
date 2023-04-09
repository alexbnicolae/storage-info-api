import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { initPassport } from './initPassport';
import authRouter from './src/routes/auth';
import contentRouter from './src/routes/content';
import wordfileRouter from './src/routes/wordfile';

dotenv.config();

const bodyParser = require('body-parser');
const app: Express = express();
const port = 3000;

app.use(bodyParser.json());
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

