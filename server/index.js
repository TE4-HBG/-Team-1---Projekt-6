import express, { json } from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(json());
import router from "./router.js"
app.use(router);
// get driver connection
import Database from "./Database.js";
import { getNobelPrizes, getNobelPrizeCount, getLaureateCount, getLaureates } from "./RequestAPI.js";
import PopulateCollection, { PopulatePrizesAndLaurates } from "./populate.js";
import setIntervalImmediately from "./setIntervalImmediately.js";
import { LaureateID, TranslateLaureate, TranslateNobelPrize } from "./translate.js";
import { ObjectId } from "mongodb";



app.listen(port, async () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
  await Database.Connect();

  await setIntervalImmediately(async() => {
    await PopulateDatabase();
  }, 3_600_000)
});

async function PopulateDatabase() {
  await PopulatePrizesAndLaurates();
  //await await PopulateCollection(Database.GetPrizes(), getNobelPrizeCount, getNobelPrizes, TranslateNobelPrize);
  //await await PopulateCollection(Database.GetLaureates(), getLaureateCount, getLaureates, TranslateLaureate, LaureateID);
  console.log("Did the do!");
}