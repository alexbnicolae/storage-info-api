import passport from "passport";
import FacebookStrategy from "passport-facebook";
import GoogleStrategy from "passport-google-oauth20";
import "dotenv/config";
import { facebook, google } from "./passportConfig";
import session from "express-session";

export const initPassport = (app: any) => {
  //init's the app session
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "dnjhdfklgjdgkjdfl;d;dfgdlf",
    })
  );
  //init passport
  app.use(passport.initialize());
  app.use(passport.session());
};

////////// FACEBOOK //////////
passport.use(
  new FacebookStrategy.Strategy(
    facebook,
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
       console.log(profile);
      //done(err, user) will return the user we got from fb
      done(null, formatFB(profile._json));
    }
  )
);

////////// GOOGLE //////////
passport.use(
  new GoogleStrategy.Strategy(
    google,
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      console.log(profile, accessToken, refreshToken);
      //done(err, user) will return the user we got from fb
      done(null, formatGoogle(profile._json, accessToken));
    }
  )
);

////////// Serialize/Deserialize //////////

// Serialize user into the sessions
passport.serializeUser((user: any, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user: any, done) => done(null, user));

////////// Format data//////////

const formatGoogle = (profile: any, token: any) => {
  return {
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    token: token
  };
};
const formatFB = (profile: any) => {
  return {
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: profile.email
  };
};