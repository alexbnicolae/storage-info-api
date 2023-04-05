import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Content from './src/models/content/content.schema';
import passport from "passport";
import { initPassport } from './initPassport';

dotenv.config();

const app: Express = express();
const port = 3000;

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
    .on('error', (error: any) => {
        console.log(error)
    })

Content.find().then(data => console.log(data));

// will go access 3rd party to get permission to access the data
app.get("/user/login/facebook", passport.authenticate("facebook", { scope: ["email"] })); //define the scope to also access the email
app.get("/user/login/google", passport.authenticate("google", { scope: ["profile", "email"] })); //define this scope to have access to the email

//once permission to exchange data is granted, a callback will be fired
app.get(
  "/user/login/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth/facebook" }),
  // Redirect user back to the mobile app using deep linking
  (req: any, res) => {
    
    res.redirect(
      `storageInfoApp://app/login?firstName=${req.user.firstName}/lastName=${req.user.lastName}/email=${req.user}`
    );
  }
);

app.get(
  "/user/login/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  // Redirect user back to the mobile app using deep linking
  (req: any, res) => {
    res.redirect(
      `storageInfoApp://app/login?firstName=${req.user.firstName}/lastName=${req.user.lastName}/email=${req.user.email}/token=${req.user.token}`
    );
  }
);

app.get("/logout", function (req, res) {
  console.log("here");
  req.session.destroy(function () {
    res.redirect("storageInfoApp://");
  });
});
