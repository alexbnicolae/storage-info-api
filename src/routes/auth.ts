import { Router } from 'express';
import passport from "passport";
import { createToken } from '../utils/createToken';
import User from '../models/Users/user.schema';
import { httpInterceptor } from '../utils/httpInterceptor';

const authRouter = Router();


// will go access 3rd party to get permission to access the data
authRouter.get("/user/login/facebook", passport.authenticate("facebook", { scope: ["profile", "email"] }), async (req: any, res: any) =>{console.log(req.body)}); //define the scope to also access the email
authRouter.get("/user/login/google", passport.authenticate("google", { scope: ["profile", "email"] })); //define this scope to have access to the email
authRouter.get("/user/login/github", passport.authenticate("github", { scope: [ 'user:email' ] })); //define this scope to have access to the email

//once permission to exchange data is granted, a callback will be fired
authRouter.get(
  "/user/login/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth/facebook" }),
  // Redirect user back to the mobile app using deep linking
  async (req: any, res) => {
    let token = createToken(req.user); // token created
    // await User.findByIdAndUpdate(req.user.id, {
    //     email: req.user.email,
    //     name: req.user.name,
    //     externId: req.user.id?.toString(),
    //     token: token,
    //     validToken: true
    // }, { upsert: true })
    res.redirect(
      `storageInfoApp://app/login?token=${token}`
    );
  }
);

authRouter.get(
  "/user/login/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  // Redirect user back to the mobile app using deep linking
  async (req: any, res: any) => {
    console.log(req.body)
    let token = createToken(req.user); // token created

    let user = await User.findOne({externId: req.user.id});

    if(!user) {
      await User.findOneAndUpdate({externId: req.user.id}, {
          email: req.user.email,
          name: req.user.name,
          externId: req.user.id?.toString(),
          token: token,
          validToken: true,
          languageId: 0
      }, { upsert: true })
    }
    else {
      await User.findOneAndUpdate({externId: req.user.id}, {
        token: token
      })
    }

    res.redirect(
      `storageInfoApp://app/login?token=${token}/isUserNew=${!user}`
    );
  }
);


authRouter.get('/user/login/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req: any, res: any) => {
    let token = createToken(req.user); // token created

    let user = await User.findOne({externId: req.user.id});

    if(!user) {
      await User.findOneAndUpdate({externId: req.user.id}, {
          email: req.user.email,
          name: req.user.name,
          externId: req.user.id?.toString(),
          token: token,
          validToken: true,
          languageId: 0
      }, { upsert: true })

    } else {
      await User.findOneAndUpdate({externId: req.user.id}, {
        token: token
      })
    }


    res.redirect(
      `storageInfoApp://app/login?token=${token}/isUserNew=${!user}`
    );
  });

authRouter.get("/logout", async function (req, res) {
    const token = req?.headers?.authorization?.split(' ')[1];
    let code = await httpInterceptor(token);

    if(code == 401){
        res.json({ code: 401 });
    }
    else {
        await User.findOneAndUpdate({token: token}, {
            validToken: false
        })
        res.json({code: 200})
    }
});


export default authRouter;