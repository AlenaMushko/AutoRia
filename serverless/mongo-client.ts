import {MongoClient} from 'mongodb';
import {DB_URI} from "./src/configs/configs";

export const client = new MongoClient(DB_URI);
export const connection = client.db();
