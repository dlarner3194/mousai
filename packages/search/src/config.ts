import dotenv = require("dotenv");
dotenv.config();

import * as envalid from "envalid";
const { str } = envalid;

interface IConfigType {
  LOG_LEVEL: string;
  AWS_REGION: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
}

export const config = envalid.cleanEnv<IConfigType>(
  process.env,
  {
    LOG_LEVEL: str({
      choices: ["error", "warn", "info", "debug"],
      devDefault: "debug"
    }),
    AWS_REGION: str({ devDefault: "us-east-1" }),
    SPOTIFY_CLIENT_ID: str({ devDefault: "name" }),
    SPOTIFY_CLIENT_SECRET: str({ devDefault: "something" })
  },
  {
    strict: true
  }
);
