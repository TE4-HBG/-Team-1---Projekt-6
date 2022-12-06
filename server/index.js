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
import { ConnectToMongoDB, GetDb } from "./db/conn.js";
import { getNobelPrizes, getNobelPrizeCount, getLaureateCount, getLaureates } from "./RequestAPI.js";
import PopulateCollection from "./populate.js";
import setIntervalImmediately from "./setIntervalImmediately.js";
import { LaureateID, TranslateLaureate, TranslateNobelPrize } from "./translate.js";
import { ObjectId } from "mongodb";



app.listen(port, async () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
  await ConnectToMongoDB();

  setIntervalImmediately(async() => {
    await PopulateDatabase();
  }, 3_600_000)
});

async function PopulateDatabase() {
  
  const db = GetDb("NobelPrizes");
  await await PopulateCollection(db.collection("Prizes"), getNobelPrizeCount, getNobelPrizes, TranslateNobelPrize);
  await await PopulateCollection(db.collection("Laureates"), getLaureateCount, getLaureates, TranslateLaureate, LaureateID);
  console.log("Did the do!");
}