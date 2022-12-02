import express, { json } from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(json());
import record from "./routes/record.js"
app.use(record);
// get driver connection
import { connectToServer, getDb } from "./db/conn.js";
import { getNobelPrizes, getNobelPrizeCount } from "./RequestAPI.js";
import { Collection } from "mongodb";

app.listen(port, () => {
  // perform a database connection when server starts
  connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
  PopulateDatabase();
  setInterval(() => {
    PopulateDatabase();
  }, 3_600_000);
});

async function PopulateDatabase() {
  const db = getDb("NobelPrizes");
  const prizes = db.collection("Prizes");
  const apiCount = await getNobelPrizeCount();
  const databaseCount = await prizes.estimatedDocumentCount();
  if(apiCount != databaseCount) {
    const rest = await getNobelPrizes(databaseCount, apiCount - databaseCount);
    rest.forEach((prize,index) => InsertNobelPrizeIntoDatabase(prize,index, prizes));
  }
}

/**
 * 
 * @param {NobelPrize} prize 
 * @param {number} index
 * @param {Collection<Document>} collection
 */
function InsertNobelPrizeIntoDatabase(prize, index, collection) {
  throw "AAAAAAAAAAAAAAAAA"
}