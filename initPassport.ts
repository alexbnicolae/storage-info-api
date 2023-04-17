import passport from "passport";
import FacebookStrategy from "passport-facebook";
import GitHubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth20";
import "dotenv/config";
import { facebook, github, google } from "./passportConfig";
import session from "express-session";

export const initPassport = (app: any) => {
  //init's the app session
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SECRET_SESSION_KEY ?? '',
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
      //done(err, user) will return the user we got from fb
      done(null, formatFB(profile));
    }
  )
);

////////// GOOGLE //////////
passport.use(
  new GoogleStrategy.Strategy(
    google,
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      //done(err, user) will return the user we got from fb
      done(null, formatGoogle(profile._json));
    }
  )
);

passport.use(
  new GitHubStrategy.Strategy(
    github,
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      //done(err, user) will return the user we got from fb
      done(null, formatGithub(profile));
    }
  )
);


////////// TWITTER //////////

////////// Serialize/Deserialize //////////

// Serialize user into the sessions
passport.serializeUser((user: any, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user: any, done) => done(null, user));

////////// Format data//////////

const formatGoogle = (profile: any) => {
  return {
    id: profile.sub,
    name: profile.name,
    email: profile.email
  };
};
const formatFB = (profile: any) => {
  console.log(profile)
  return {
    id: profile.id,
    name: profile.name,
    // email: profile.email
  };
};

const formatGithub = (profile: any) => {
  return {
    id: profile.id,
    name: profile.username,
    email: profile.emails[0].value
  };
};