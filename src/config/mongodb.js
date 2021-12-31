import { MongoClient } from "mongodb";

let dbInstance = null;


export const connectDB = async () => {
  const client = new MongoClient("mongodb+srv://hoangthai:UXKFX7HctXN4Rd1n@cluster0.08izc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }); 

  // connect the client to server
  await client.connect();

  //Assign clientDB to our dbInstance

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