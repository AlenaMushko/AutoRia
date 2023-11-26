import { config } from "dotenv";

config();

export const configs = {
  DB_URI: process.env.DB_URI,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  FORGOT_TOKEN_SECRET: process.env.FORGOT_TOKEN_SECRET,
  ACTIVATED_TOKEN_SECRET: process.env.ACTIVATED_TOKEN_SECRET,

  PORT: process.env.PORT,

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  MANAGER_EMAIL: process.env.MANAGER_EMAIL,

  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  AWE_S3_URL: process.env.AWE_S3_URL,
};
