import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import "./app/config/passport";
import { globalErrorHandlers } from "./app/middlewares/globalErrorHandlers";
import notfound from "./app/middlewares/notfound";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import passport from "passport";
import expressSession from "express-session";

const app = express();
app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcom to Tour management system backend",
  });
});

app.use(globalErrorHandlers);
app.use(notfound);

export default app;
