import {MongoClient} from 'mongodb';
import {DB_URI} from "./src/configs/configs";

export const client = new MongoClient(DB_URI);
export const connection = client.db();

// export async function connectToDatabase() {
//   try {
//     const client = new MongoClient(DB_URI);
//     console.log('cl====', client);
//     await client.connect();
//     console.log('connected');
//     return client.db();
//   } catch (error) {
//     console.error('Error connecting to MongoDB', error);
//     throw new ApiError(error.message, error.code);
//   }
// // }
// const db = await connectToDatabase();
// const users = await db.collection("users").find().skip(skip).limit(+limit).toArray();
