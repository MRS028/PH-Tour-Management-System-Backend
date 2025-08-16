/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
// import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    // console.log(envVars.NODE_ENV);
    await mongoose.connect(envVars.DB_URL);

    console.log("Connected to mongoDB ✅"); 
    server = app.listen(envVars.PORT, () => {
      console.log(`Server is running at port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
// unhandledRejection error
process.on("unhandledRejection", (error) => {
  console.log(
    "UnhandledRejection error detected ....Server shutting down",
    error
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Promise.reject(new Error("Something went wrong"))
// uncaughtException error
process.on("uncaughtException", (error) => {
  console.log(
    "UncaughtException error detected ....Server shutting down",
    error
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// throw new Error("Something went wrong");

// signal error
// process.on("SIGTERM", () => {
//   console.log("SIGTERM is received");
//   if (server) {
//     server.close();
//   }
// });

// process.on("SIGINT", () => {
//   console.log("SIGINT is received");
//   if (server) {
//     server.close();
//   }
// });

/*
  unhandledRejection error
  uncaught rejection error
  signals transmission error



*/
