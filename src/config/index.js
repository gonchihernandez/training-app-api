import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;

export const JWT_SECRET = process.env.JWT_SECRET;
export const PG_PORT = process.env.PG_PORT;
export const PG_HOST = process.env.PG_HOST;
export const PG_USER = process.env.PG_USER;
export const PG_PASSWORD = process.env.PG_PASSWORD;
export const PG_DATABASE = process.env.PG_DATABASE;

export const ORIGIN = process.env.ORIGIN;
