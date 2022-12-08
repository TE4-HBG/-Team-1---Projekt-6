import { Router } from "express";
import Database from "./Database.js";
import delay from "./delay.js";
import RandomInt from "./random.js";

// router is an instance of the express router.
// We use it to define our routes.
const router = Router();

const prizeCache = {};
const laureateCache = {};


router.route("/random/prize").get(async function (req, res) {
  const size = req.query.size ? req.query.size : 1;
  const arr = await Database.GetPrizes().aggregate([{ $sample: { size: size } }]).toArray();
  res.json(arr);
});
router.route("/login/").get(async function(req, res) {

})

router.route("/random/laureate").get(async function (req, res) {
  const size = req.query.size ? req.query.size : 1;
  const arr = await Database.GetLaureates().aggregate([{ $sample: { size: size } }]).toArray();
  res.json(arr);
});
router.route("/get/prize/:prompt/:i").get(async function (req, res) {
  const id = await getNobelPrizePrompt(req.params.i, req.params.prompt);
  if (id) {
    res.json(await Database.GetPrizes().findOne({ _id: id }))
  } else {
    res.json(null)
  }
});
router.route("/get/laureate/:prompt/:i").get(async function (req, res) {
  const id = await getLaureatePrompt(req.params.i, req.params.prompt);
  if (id) {
    res.json(await Database.GetLaureates.findOne({ _id: id }))
  } else {
    res.json(null)
  }

});

router.route("/*").get(async function (req, res) {
  res.send("<body style='background-color'>:)<body>")
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

  if (laureateCache[prompt] === undefined) {
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
  if (laureateCache[prompt] === undefined) {
    laureateCache[prompt] = {
      isRunning: true,
      arr: [],
    }
  }

  console.log("Caching laureates with prompt \"" + prompt + "\".");
  const laureates = await Database.GetLaureates().find({}).toArray();
  for (let i = 0; i < laureates.length; i++) {
    if (promptIsCool(prompt, laureates[i])) {
      laureateCache[prompt].arr.push(laureates[i]._id);
    }
  }
  console.log("cached all laureates for prompt \"" + prompt + "\".")
  laureateCache[prompt].isRunning = false;
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

  const prizes = await Database.GetPrizes().find({}).toArray();
  const laureates = Database.GetLaureates();

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
  prizeCache[prompt].isRunning = false;
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

export default router;