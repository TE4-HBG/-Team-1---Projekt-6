import { Router } from "express";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = Router();

const prizeCache = {};
const laureateCache = {};

// This will help us connect to the database
import { getDb } from "../db/conn.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId, Document } from "mongodb";

import { getLaureateCount, getNobelPrizeCount, getLaureate } from "../RequestAPI.js";
import delay from "../delay.js";


// get the records
recordRoutes.route("prize/:prompt").get(async function (req, res) {
  const db_connect = getDb("NobelPrizes");





  //const query = req.query.id && ObjectId.isValid(req.query.id) ? { "_id": ObjectId(req.query.id) } : {}


  const document = await db_connect
    .collection("Prizes")
    .find(query).toArray();
  res.json(document);

});
// get the records
recordRoutes.route("laureate/:prompt").get(async function (req, res) {





  //const query = req.query.id && ObjectId.isValid(req.query.id) ? { "_id": ObjectId(req.query.id) } : {}



  res.json(document);
});


async function getNobelPrizePrompt(i, prompt) {

  if (prizeCache[prompt] === undefined || new Date() - prizeCache[prompt].finished > 3_600_000) {
    cacheNobelPrizePrompt(prompt);
  }
  

  while (prizeCache[prompt].isRunning) {
    if (prizeCache[prompt].arr[i]) {
      return prizeCache[prompt].arr[i];
    }
    await delay(500);
  }

  return laureateCache[prompt].arr[i];
}
async function getLaureatePrompt(i, prompt) {

  if (laureateCache[prompt] === undefined || new Date() - laureateCache[prompt].finished > 3_600_000) {
    cacheLauratePrompt(prompt);
  }
  

  while (laureateCache[prompt].isRunning) {
    if (laureateCache[prompt].arr[i]) {
      return laureateCache[prompt].arr[i];
    }
    await delay(500);
  }

  return laureateCache[prompt].arr[i];
}

async function cacheLauratePrompt(prompt) {
  if(laureateCache[prompt]) {
    laureateCache[prompt].isRunning = true;
  } else {
    laureateCache[prompt] = {
      isRunning: true,
      arr: [],
      finished: null,
    }
  }
  
  const count = (await getLaureateCount() + 1);
  const collection = getDb("NobelPrizes").collection("Laureates");
  for (let i = 1; i < count; i++) {
    const document = await collection.findOne({ _id: i });
    if (promptIsCool(prompt, document)) {
      laureateCache[prompt].arr.push(i);
    }
  }
  isRunning = false;
  finished = new Date();
}
async function cacheNobelPrizePrompt(prompt) {
  if(prizeCache[prompt]) {
    prizeCache[prompt].isRunning = true;
  } else {
    prizeCache[prompt] = {
      isRunning: true,
      arr: [],
      finished: null,
    }
  }
  
  const count = await getNobelPrizeCount();
  const db = getDb("NobelPrizes")
  const collection = db.collection("Prizes");
  const laureates = db.collection("Prizes");
  for (let i = 0; i < count; i++) {
    /**
     * @type {APINobelPrize}
     */
    const document = await collection.findOne({ _id: i });
    if(document.laureates) {
      for(let l = 0; l < document.laureates.length; l++) {
        if(promptIsCool(prompt, await getLaureate(l)))
      }
    }
    if(document.laureates && document.laureates.reduce(((acc, val) => {
      acc |= promptIsCool(prompt, val);
    }, false))) {
      prizeCache[prompt] = i;
    }
  }
  isRunning = false;
  finished = new Date();
}


function promptIsCool(prompt, laureate) {
  return ((laureate.fileName.includes(prompt)) || (laureate.orgName && laureate.orgName.includes(prompt)) || (laureate.knownName && laureate.knownName.includes(prompt)))
}

export default recordRoutes;