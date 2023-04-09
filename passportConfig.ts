
import "dotenv/config";
import IStrategyOption, { IStrategyOptionBase } from "passport-twitter";

export const facebook:  any = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret:  process.env.FACEBOOK_APP_SECRET,
  //todo: based on env, change url to localhost, dev or prod
  callbackURL: "https://precor.serveo.net/user/login/facebook/callback",
  enableProof: true, //to enable secret proof
  profileFields: ['id', 'emails', 'displayName'], //scope of fields,
};
export const google: any = {
  clientID: process.env.GMAIL_APP_ID,
  clientSecret: process.env.GMAIL_APP_SECRET,
  //todo: based on env, change url to localhost, dev or prod
  callbackURL: "https://precor.serveo.net/user/login/google/callback",
};

export const twitter: IStrategyOptionBase = {
  consumerKey: process.env.TWITTER_APP_ID ?? '',
  consumerSecret: process.env.TWITTER_APP_SECRET ?? '',
  callbackURL: "https://precor.serveo.net/user/login/twitter/callback",
};

