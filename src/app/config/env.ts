import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables = ["PORT", "DB_URL", "NODE_ENV"];

requiredEnvVariables.forEach((envVariable) => {
  if (!process.env[envVariable]) {
    throw new Error(`Missing environment variable: ${envVariable}`);
  }
});

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  };
};

export const envVars = loadEnvVariables();
