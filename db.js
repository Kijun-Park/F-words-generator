import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = error => console.log(`Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);

// const db = [
//   {
//     word: "Fuck"
//   },
//   {
//     word: "Fucking hell"
//   },
//   {
//     word: "Fuck you"
//   },
//   {
//     word: "Fuck off"
//   },
//   {
//     word: "Holy fuck"
//   },
//   {
//     word: "Fucking shit"
//   },
//   {
//     word: "Shut the fuck up"
//   },
//   {
//     word: "Fuck your mother"
//   }
// ];

// export default db;
