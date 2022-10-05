import * as dotenv from 'dotenv';

dotenv.config();

export const db = {
  schema: process.env.DB_SCHEMA,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  type: process.env.DB_TYPE,
  table: process.env.DB_TABLE,
};

export const network = {
  port: process.env.PORT,
};
