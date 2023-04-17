
import "dotenv/config";
import { StrategyOptions } from "passport-github2"

export const facebook:  any = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret:  process.env.FACEBOOK_APP_SECRET,
  //todo: based on env, change url to localhost, dev or prod
  callbackURL: "https://precor.serveo.net/user/login/facebook/callback",
};
export const google: any = {
  clientID: process.env.GMAIL_APP_ID,
  clientSecret: process.env.GMAIL_APP_SECRET,
  //todo: based on env, change url to localhost, dev or prod
  callbackURL: "https://precor.serveo.net/user/login/google/callback",
};


export const github: StrategyOptions = {
  clientID: process.env.GITHUB_APP_ID ?? '',
  clientSecret: process.env.GITHUB_APP_SECRET ?? '',
  callbackURL: "https://precor.serveo.net/user/login/github/callback",
  scope: ['user:email']

};

