import { MongoClient,  } from "mongodb";
import { env } from "./enviroment.js";

let dbInstance = null;


export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }); 

  // connect the client to server
  await client.connect();

  //Assign clientDB to our dbInstance
  console.log(env.DATABASE_NAME);
  dbInstance = client.db('estella-app');
}; 

// const listDatabases = async (client) => {
//   const databases = await client.db().admin().listDatabases();
//   console.log(
//     "database: " +
//       databases.databases.forEach((db) => console.log(` ${db.name}`))
//   );
// };

//Get database Instance
export const getDB = () => {

  if(!dbInstance) throw new Error('Must connect to Database first!');
  return dbInstance;
}