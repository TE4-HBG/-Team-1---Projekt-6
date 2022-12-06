import { Router } from "express";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = Router();

const prizeCache = {};
const laureateCache = {};

// This will help us connect to the database
import { GetDb } from "../db/conn.js";

// This help convert the id from string to ObjectId for the _id.
//import { ObjectId, Document } from "mongodb";

import { getLaureateCount, getNobelPrizeCount, getLaureate } from "../RequestAPI.js";
import delay from "../delay.js";


// get the records
recordRoutes.route("/prize/:prompt/:i").get(async function (req, res) {
  const id = await getNobelPrizePrompt(req.params.i, req.params.prompt);
  if (id) {
    res.json(await GetDb("NobelPrizes").collection("Prizes").findOne({ _id: id }))
  } else {
    res.json(null)
  }

});
// get the records
recordRoutes.route("/laureate/:prompt/:i").get(async function (req, res) {
  const id = await getLaureatePrompt(req.params.i, req.params.prompt);
  if (id) {
    res.json(await GetDb("NobelPrizes").collection("Laureates").findOne({ _id: id }))
  } else {
    res.json(null)
  }
  
});
recordRoutes.route("/test").get(async function (req, res) {
  res.send("hello :)")
});


async function getNobelPrizePrompt(i, prompt) {
  if (prizeCache[prompt] === undefined || (!prizeCache[prompt].isRunning && new Date() - prizeCache[prompt].finished > 3_600_000)) {
    cacheNobelPrizePrompt(prompt);
  }


  while (prizeCache[prompt].isRunning) {
    
    if (prizeCache[prompt].arr[i]) {
      break;
    }
    console.log("waiting for results :(")
    await delay(2000);
  }
  console.log("Yay i got one: " + prizeCache[prompt].arr[i])
  return prizeCache[prompt].arr[i];
}
async function getLaureatePrompt(i, prompt) {

  if (laureateCache[prompt] === undefined || (!laureateCache[prompt].isRunning && new Date() - laureateCache[prompt].finished > 3_600_000)) {
    cacheLauratePrompt(prompt);
  }


  while (laureateCache[prompt].isRunning) {
    if (laureateCache[prompt].arr[i]) {
      break;
    }
    console.log("waiting for results :(")
    await delay(2000);
  }
  console.log("Yay i got one: " + laureateCache[prompt].arr[i])
  return laureateCache[prompt].arr[i];
}

async function cacheLauratePrompt(prompt) {
  if (laureateCache[prompt]) {
    laureateCache[prompt].isRunning = true;
  } else {
    laureateCache[prompt] = {
      isRunning: true,
      arr: [],
      finished: null,
    }
  }
  console.log("Caching laureates with prompt \"" + prompt + "\".");
  const laureates = await GetDb("NobelPrizes").collection("Laureates").find({}).toArray();
  console.log(laureates.length);
  for (let i = 0; i < laureates.length; i++) {
    if (promptIsCool(prompt, laureates[i])) {
      laureateCache[prompt].arr.push(laureates[i]._id);
    }
  }
  console.log("cached all laureates for prompt \"" + prompt + "\".")
  laureateCache[prompt].isRunning = false;
  laureateCache[prompt].finished = new Date();
  clearCache(laureateCache[prompt], 3600000);
}
async function cacheNobelPrizePrompt(prompt) {
  console.log("Caching nobel prizes with prompt \"" + prompt + "\".");
  if (prizeCache[prompt]) {
    prizeCache[prompt].isRunning = true;
  } else {
    prizeCache[prompt] = {
      isRunning: true,
      arr: [],
      finished: null,
    }
  }
  //console.log("swag");
  const db = GetDb("NobelPrizes")

  const prizes = await db.collection("Prizes").find({}).toArray();
  const laureates = db.collection("Laureates");

  for (let p = 0; p < prizes.length; p++) {
    if (prizes[p].laureates) {
      for (let l = 0; l < prizes[p].laureates.length; l++) {
        
        let test = await laureates.findOne({ _id: prizes[p].laureates[l] });
        
        if (promptIsCool(prompt, test)) {
          console.log("FOUND ONE WHOOO!")
          prizeCache[prompt].arr.push(prizes[p].laureates[l]);
        }
      }
    }
  }
  console.log("cached all nobel prizes for prompt \"" + prompt + "\".")
  console.log(prizeCache[prompt]);
  prizeCache[prompt].isRunning = false;
  prizeCache[prompt].finished = new Date();
  clearCache(prizeCache[prompt], 3600000);

}

function clearCache(cache, ms) {
  setInterval(() => {
    cache = undefined;
  }, ms);
}

function promptIsCool(prompt, laureate) {
  const coolPrompt = prompt.toLowerCase();
  return (
    ((laureate.fileName !== null || laureate.fileName !== undefined) && laureate.fileName.toLowerCase().includes(coolPrompt)) ||
    (laureate.orgName && laureate.orgName.toLowerCase().includes(coolPrompt)) ||
    (laureate.knownName && laureate.knownName.toLowerCase().includes(coolPrompt))
  );

}

export default recordRoutes;