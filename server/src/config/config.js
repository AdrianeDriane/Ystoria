import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const MONGOD_BURL = process.env.MONGODB_URL;
