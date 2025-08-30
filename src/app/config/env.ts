import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  BCRYPT_SALT_ROUNDS: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables = ["PORT", "DB_URL", "NODE_ENV", "JWT_SECRET", "JWT_EXPIRES_IN", "BCRYPT_SALT_ROUNDS"];

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
  };
};

export const envVars = loadEnvVariables();
