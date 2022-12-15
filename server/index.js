import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router.js"
import Database from "./Database.js";
import { PopulatePrizesAndLaurates } from "./populate.js";
import setIntervalImmediately from "./setIntervalImmediately.js";


// configures the environment path, so we can access environment variables  
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;

// creates an express app
const app = express();

// tells the express app to allow Cross-origin resource sharing, allowing us to 
// A) talk to mongodb 
// B) allow the react website to talk to this server
app.use(cors());

// same as above, but instead alllows the express app to handle json
app.use(json());

// this object contains all the routings. you can look in router.js for more info.
app.use(router);

// this tells our app to listen for connections. 
// The inside function is run after the app starts listening for connections.
app.listen(port, async () => {
  
  console.log(`Server is running on port: ${port}`);

  Database.Connect()
  // connect to database when server starts
  await Database.connection;

  // every hour, Populate the database from the nobel prize api
  await setIntervalImmediately(async () => {
    await PopulatePrizesAndLaurates();
    console.log("Sucessfully updated database!");
  }, 3_600_000)
});