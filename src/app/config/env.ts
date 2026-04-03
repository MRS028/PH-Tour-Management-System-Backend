import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  BCRYPT_SALT_ROUNDS: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  EXPRESS_SESSION_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  FRONTEND_URL: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_URL: string;
  CLOUDINARY_FOLDER: string;
  SSL: {
    SSL_COMMERZ_STORE_ID: string;
    SSL_COMMERZ_STORE_PASSWORD: string;
    SSL_COMMERZ_PAYMNET_API: string;
    SSL_COMMERZ_VALIDATION_API: string;
    SSL_COMMERZ_SUCCESS_BACKEND_URL: string;
    SSL_COMMERZ_FAIL_BACKEND_URL: string;
    SSL_COMMERZ_CANCEL_BACKEND_URL: string;
    SSL_COMMERZ_SUCCESS_FRONTEND_URL: string;
    SSL_COMMERZ_FAIL_FRONTEND_URL: string;
    SSL_COMMERZ_CANCEL_FRONTEND_URL: string;
  };
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "JWT_SECRET",
    "JWT_EXPIRES_IN",
    "BCRYPT_SALT_ROUNDS",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES_IN",
    "EXPRESS_SESSION_SECRET",
    "FRONTEND_URL",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "CLOUDINARY_URL",
    "CLOUDINARY_FOLDER",
    "SSL_COMMERZ_STORE_ID",
    "SSL_COMMERZ_STORE_PASSWORD",
    "SSL_COMMERZ_PAYMNET_API",
    "SSL_COMMERZ_VALIDATION_API",
    "SSL_COMMERZ_SUCCESS_BACKEND_URL",
    "SSL_COMMERZ_FAIL_BACKEND_URL",
    "SSL_COMMERZ_CANCEL_BACKEND_URL",
    "SSL_COMMERZ_SUCCESS_FRONTEND_URL",
    "SSL_COMMERZ_FAIL_FRONTEND_URL",
    "SSL_COMMERZ_CANCEL_FRONTEND_URL",
  ];

  requiredEnvVariables.forEach((envVariable) => {
    if (!process.env[envVariable]) {
      throw new Error(`Missing environment variable: ${envVariable}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL as string,
    CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER as string,
    SSL: {
      SSL_COMMERZ_STORE_ID: process.env.SSL_COMMERZ_STORE_ID as string,
      SSL_COMMERZ_STORE_PASSWORD: process.env
        .SSL_COMMERZ_STORE_PASSWORD as string,
      SSL_COMMERZ_PAYMNET_API: process.env.SSL_COMMERZ_PAYMNET_API as string,
      SSL_COMMERZ_VALIDATION_API: process.env
        .SSL_COMMERZ_VALIDATION_API as string,
      SSL_COMMERZ_SUCCESS_BACKEND_URL: process.env
        .SSL_COMMERZ_SUCCESS_BACKEND_URL as string,
      SSL_COMMERZ_FAIL_BACKEND_URL: process.env
        .SSL_COMMERZ_FAIL_BACKEND_URL as string,
      SSL_COMMERZ_CANCEL_BACKEND_URL: process.env
        .SSL_COMMERZ_CANCEL_BACKEND_URL as string,
      SSL_COMMERZ_SUCCESS_FRONTEND_URL: process.env
        .SSL_COMMERZ_SUCCESS_FRONTEND_URL as string,
      SSL_COMMERZ_FAIL_FRONTEND_URL: process.env
        .SSL_COMMERZ_FAIL_FRONTEND_URL as string,
      SSL_COMMERZ_CANCEL_FRONTEND_URL: process.env
        .SSL_COMMERZ_CANCEL_FRONTEND_URL as string,
    },
  };
};

export const envVars = loadEnvVariables();
