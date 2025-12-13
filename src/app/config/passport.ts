import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
// passportjs configuration
import passport, { Profile } from "passport";
import {
  Strategy as GoogleStrategy,
  
  VerifyCallback,
} from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as LocalStrateegy } from "passport-local";
import AppError from "../errorHelpers/AppError";

passport.use(
  new LocalStrateegy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
          return done(null, false, { message: "User not found" });
        }
        const isGoogleAuthenticated = isUserExist.auths?.some(
          (auth) => auth.provider === "google"
        );
        if (isGoogleAuthenticated && !isUserExist.password) {
          return done(null, false, {
            message:
              "User is authenticated with Google,if you want to login with credentials,please reset your password.",
          });
        }
        const isFacebookAuthenticated = isUserExist.auths?.some(
          (auth) => auth.provider === "facebook"
        );
        if (isFacebookAuthenticated) {
          return done(null, false, {
            message: "User is authenticated with Facebook",
          });
        }
        const isTwitterAuthenticated = isUserExist.auths?.some(
          (auth) => auth.provider === "twitter"
        );
        if (isTwitterAuthenticated) {
          return done(null, false, {
            message: "User is authenticated with Twitter",
          });
        }
        const isGithubAuthenticated = isUserExist.auths?.some(
          (auth) => auth.provider === "github"
        );
        if (isGithubAuthenticated) {
          return done(null, false, {
            message: "User is authenticated with Github",
          });
        }

        const isPasswordMatched = await bcryptjs.compare(
          password as string,
          isUserExist.password as string
        );
        if (!isPasswordMatched) {
          throw new AppError(httpStatus.BAD_REQUEST, "incorrect password");
        }

        return done(null, isUserExist);
      } catch (error) {
        // console.error("Error in Local Strategy:", error);
        return done(error);
      }
    }
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(null, false, { message: "No email found" });
        }

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
          // console.log("New user created:", user);
        }
        return done(null, user);
      } catch (error) {
        // console.error("Error in Google Strategy:", error);
        return done(error);
      }
    }
  )
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  done(null, user._id);
});

passport.deserializeUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (id: string, done: (err: any, user?: any) => void) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      // console.error("Error in deserializing user:", error);
      done(error);
    }
  }
);
