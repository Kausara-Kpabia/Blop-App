const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MOMGO_DB_CONNECT_URL;

// connect to mongodb
function connectToMongoDB() {
 mongoose.connect(MONGODB_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB", err);
 });
}

module.exports = { connectToMongoDB };




//const connectionParams={
  //  useNewUrlParser: true,
  //  useCreateIndex: true,
 //   useUnifiedTopology: true 
//}
//mongoose.connect(MONGODB_URI, connectionParams)
    //.then( () => {
    //    console.log('Connected to the database ')
    //})
    //.catch( (err) => {
    //    console.error(`Error connecting to the database. n${err}`);
   // })
