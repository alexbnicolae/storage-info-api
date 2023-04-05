
import "dotenv/config";

export const facebook: any = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  //todo: based on env, change url to localhost, dev or prod
  callbackURL: "https://precor.serveo.net/user/login/google/callback",
  enableProof: true, //to enable secret proof
  profileFields: ['id', 'emails', 'name'] //scope of fields
};
export const google: any = {
  clientID: process.env.GMAIL_APP_ID,
  clientSecret: process.env.GMAIL_APP_SECRET,
  //todo: based on env, change url to localhost, dev or prod
  callbackURL: "https://precor.serveo.net/user/login/google/callback"
};

