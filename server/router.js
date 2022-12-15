import { ObjectID } from "bson";
import { Router } from "express";
import { ObjectId } from "mongodb";
import Database from "./database.js";
import delay from "./delay.js";
import RandomInt from "./random.js";

// router is an instance of the express router.
// We use it to define our routes.
const router = Router();

// these objects contain the cache for a search result of each prompt
// this is extremely poorly optimized ram-wise, so i wouldn't be surprised if the VPS blew up lmao.
// the structure is as such:
// since objects can be accesed via string (e.g. prizeCache["marie"]),
// we can contain an array containing the index of each prize or laureate that contains said prompt.
// as an example, laureateCache["marie"] would be:
//
// {
//   isRunning: false,
//   foundIDs: [832, 268, 6],
// }
//
// The 'isRunning' variable is used to indicate whether we should wait for possibly new id's, 
// or if we should just make do with no result 
const prizeCache = {};
const laureateCache = {};

// unfinished
// this route check the request headers for username and password,
// compares that with the databse, 
// then sends a single true or false using res.json(); 
router.route("/login/").get(async function (req, res) {
  console.log("test");
  const Username = req.header("Username");
  const Password = req.header("Password");
  console.log(Username, Password);
  //await Database.CreateUser(Username, Password);
  const users = Database.GetUsers();
  
  const isValid = (await users.findOne({username:Username, password:Password})) !=null;

  res.json(isValid);

})
router.route("/signup/").get(async function (req, res) {
  console.log("test");
  const Username = req.header("Username");
  const Password = req.header("Password");
  console.log(Username, Password);
  //await Database.CreateUser(Username, Password);
  
  res.json(await Database.CreateUser(Username,Password));

})


// this route retrieves a random prize from the database
// NOTE: the size parameter is limited to the amount of nobel prizes in the database
router.route("/random/prize").get(async function (req, res) {
  const size = req.query.size ? Number(req.query.size) : 1;
  const arr = await Database.GetPrizes().aggregate([{ $sample: { size: size } }]).toArray();
  res.json(arr);
});

// this route retrieves a random laureate from the database
// NOTE: the size parameter is limited to the amount of laureates in the database
router.route("/random/laureate").get(async function (req, res) {
  const size = req.query.size ? Number(req.query.size) : 1;
  const arr = await Database.GetLaureates().aggregate([{ $sample: { size: size } }]).toArray();
  res.json(arr);
});

// this route fetches a nobel prize from a prompt, based on the index variable
router.route("/prompt/prize/:prompt/:i").get(async function (req, res) {
  const id = await getNobelPrizePrompt(req.params.i, req.params.prompt);
  if (id) {
    res.json(await Database.GetPrizes().findOne({ _id: id }))
  } else {
    res.json(null)
  }
});

// this route fetches a laureate from a prompt, based on the index variable
router.route("/prompt/laureate/:prompt/:i").get(async function (req, res) {
  const id = await getLaureatePrompt(req.params.i, req.params.prompt);
  if (id) {
    res.json(await Database.GetLaureates().findOne({ _id: id }))
  } else {
    res.json(null)
  }

});

//This route displays favorite nobel prizes and laureate :D
router.route("/get/favorites/:id").get(async function (req, res) {
  const id = ObjectID(req.params.id); 
  const result = await Database.GetUsers().findOne({_id: id}, )
  res.json({favoritePrizes: result.favoritePrizes, favoriteLaureates: result.favoriteLaureates})
})

//This route displays favorite nobel prizes and laureates :D
router.route("/addfavorite/laureate/:userId/:laureateId").get(async function (req, res) {
  console.log(req.params.userId)
  const userCollection = Database.GetUsers();
  await userCollection.updateOne({_id: Number(req.params.userId)}, {$push: {favoriteLaureates: req.params.laureateId}})
  res.json("yomama")
})
  
// this route is a fallback 
router.route("/*").get(async function (req, res) {
  res.json({ error: "INCORRECT_ENDPOINT", info: "Hello, you did a blunder and now you see this lol :)" })
});


// this function either starts caching the nobel prize prompt, or gets the nobel prize
// this should definetly be moved to another file, i was just lazy when i wrote this
async function getNobelPrizePrompt(i, prompt) {
  if (prizeCache[prompt] === undefined || (!prizeCache[prompt].isRunning && new Date() - prizeCache[prompt].finished > 3_600_000)) {
    cacheNobelPrizePrompt(prompt);
  }


  while (prizeCache[prompt].isRunning) {

    if (prizeCache[prompt].foundIds[i]) {
      break;
    }
    console.log("waiting for results :(")
    await delay(2000);
  }
  console.log("Yay i got one: " + prizeCache[prompt].foundIds[i])
  return prizeCache[prompt].foundIds[i];
}

// same as above, but for laureates
async function getLaureatePrompt(i, prompt) {

  if (laureateCache[prompt] === undefined) {
    cacheLauratePrompt(prompt);
  }

  while (laureateCache[prompt].isRunning) {
    if (laureateCache[prompt].foundIds[i]) {
      break;
    }
    console.log("waiting for results :(")
    await delay(2000);
  }
  console.log("Yay i got one: " + laureateCache[prompt].foundIds[i])
  return laureateCache[prompt].foundIds[i];
}


// this and the function below are the most complex within this entire project.
// as such, i am gonna have a stroke if i'm gonna explain all of this function right here right now
// just like the two functions above, these functions should definetly be moved to a separate file.
async function cacheLauratePrompt(prompt) {
  if (laureateCache[prompt] === undefined) {
    laureateCache[prompt] = {
      isRunning: true,
      foundIds: [],
    }
  }

  console.log("Caching laureates with prompt \"" + prompt + "\".");
  const laureates = await Database.GetLaureates().find({}).toArray();
  for (let i = 0; i < laureates.length; i++) {
    if (promptIsCool(prompt, laureates[i])) {
      laureateCache[prompt].foundIds.push(laureates[i]._id);
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
      foundIds: [],
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
          prizeCache[prompt].foundIds.push(prizes[p].laureates[l]);
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

// this should be renamed holy shit
function promptIsCool(prompt, laureate) {
  const coolPrompt = prompt.toLowerCase();
  return (
    ((laureate.fileName !== null || laureate.fileName !== undefined) && laureate.fileName.toLowerCase().includes(coolPrompt)) ||
    (laureate.orgName && laureate.orgName.toLowerCase().includes(coolPrompt)) ||
    (laureate.knownName && laureate.knownName.toLowerCase().includes(coolPrompt))
  );

}

export default router;