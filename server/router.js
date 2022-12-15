import { Router } from "express";
import Database from "./Database.js";
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
const promptCache = {};

// unfinished
// this route check the request headers for username and password,
// compares that with the databse, 
// then sends a single true or false using res.json(); 
router.route("/login/").get(async function (req, res) {
  console.log("test");
  const username = req.header("username");
  const password = req.header("password");
  console.log(username, password);

  Database.models.User.findOne(
    { username: username, password: password },
    (err, res) => {
      if (err) {
        console.err(err);
      } else {
        console.log(res);
      }
    }
  ).exec((err, res) => {
    if (err) {
      console.error(err)
    } else {
      res.json(res._id);
    }
  });
})
router.route("/signup/").get(async function (req, res) {
  console.log("test");
  const username = req.header("username");
  const password = req.header("password");

  Database.models.User.exists(
    { username: username, password: password },
    (err, result) => {
      if (err) {
        console.err(err);
      } else {
        if (result == null) {
          new Database.models.User({ username: username, password: password }).save().then(
            (value) => {
              res.json(value._id)
            },
            (err) => {
              console.error(err)
            });
        } else {
          res.json(null)
        }
      }
    }
  );
})


// this route retrieves a random prize from the database
// NOTE: the size parameter is limited to the amount of nobel prizes in the database
router.route("/random/prize").get(async function (req, res) {
  const size = req.query.size ? Number(req.query.size) : 1;
  const arr = await Database.models.Prize.aggregate([{ $sample: { size: size } }]).exec();
  res.json(arr);
});

// this route retrieves a random laureate from the database
// NOTE: the size parameter is limited to the amount of laureates in the database
router.route("/random/laureate").get(async function (req, res) {
  const size = req.query.size ? Number(req.query.size) : 1;
  const arr = await Database.models.Laureate.aggregate([{ $sample: { size: size } }]).exec();
  res.json(arr);
});

// this route fetches a nobel prize from a prompt, based on the index variable
router.route("/prompt/prize/:prompt/:i").get(async function (req, res) {
  const id = await getNobelPrizePrompt(req.params.i, req.params.prompt);
  if (id) {
    Database.models.Prize.findOne({ _id: id }).exec((err, result) => {
      if (err) {
        console.error(err)
      } else {
        res.json(result.toObject());
      }
    })
  } else {
    res.json(null)
  }
});

// this route fetches a laureate from a prompt, based on the index variable
router.route("/prompt/laureate/:prompt/:i").get(async function (req, res) {
  const id = await getLaureatePrompt(req.params.i, req.params.prompt);
  if (id) {
    Database.models.Laureate.findOne({ _id: id }).exec((err, result) => {
      if (err) {
        console.error(err)
      } else {
        res.json(result.toObject());
      }
    })
  } else {
    res.json(null)
  }

});

// this route is a fallback 
router.route("/*").get(async function (req, res) {
  res.json({ error: "Hello, are you lost? :)" })
});


// this function either starts caching the nobel prize prompt, or gets the nobel prize
// this should definetly be moved to another file, i was just lazy when i wrote this
async function getNobelPrizePrompt(i, prompt) {
  if (promptCache[prompt] === undefined) {
    cachePrompt(prompt);
  }


  while (promptCache[prompt].isRunning) {

    if (promptCache[prompt].prizeIds[i]) {
      break;
    }
    console.log("waiting for results :(")
    await delay(2000);
  }
  console.log("Yay i got one: " + promptCache[prompt].prizeIds[i])
  return promptCache[prompt].prizeIds[i];
}

// same as above, but for laureates
async function getLaureatePrompt(i, prompt) {
  if (promptCache[prompt] === undefined) {
    
    cachePrompt(prompt);
  }

  while (!promptCache[prompt]) { console.log("waiting for prompt to be defined"); await delay(500); }
  while (promptCache[prompt].isRunning) {
    if (promptCache[prompt].laureateIds[i]) {
      break;
    }
    console.log("waiting for results :(")
    await delay(2000);
  }

  console.log("Yay i got one: " + promptCache[prompt].laureateIds[i])
  return promptCache[prompt].laureateIds[i];
}


// this and the function below are the most complex within this entire project.
// as such, i am gonna have a stroke if i'm gonna explain all of this function right here right now
// just like the two functions above, these functions should definetly be moved to a separate file.
async function cachePrompt(prompt) {
  promptCache[prompt] = {
    isRunning: true,
    laureateIds: [],
    prizeIds: [],
  }

  Database.models.Laureate.find({}).then((laureates) => {
    console.log(`caching prompt "${prompt}"`);
    laureates.forEach((laureate) => {
      if (promptIsCool(prompt, laureate)) {
        promptCache[prompt].laureateIds.push(laureate._id);
        laureate.nobelPrizes.forEach((prize) => {
          if (!promptCache[prompt].prizeIds.includes(prize)) {
            promptCache[prompt].prizeIds.push(prize);
          }
        })
      }
    });
    console.log(`done caching prompt "${prompt}"`);
    promptCache[prompt].isRunning = false;
    clearCache(promptCache[prompt], 3600000);
  }).then(undefined, (err) => { console.error(err) });
}

// this should be renamed holy shit
const Laureate = Database.models.Laureate;
/**
 * 
 * @param {string} prompt 
 * @param {Document} laureate 
 * @returns 
 */
function promptIsCool(prompt, laureate) {
  const coolPrompt = prompt.toLowerCase();

  const filename = (laureate.fileName && laureate.fileName.toLowerCase().includes(coolPrompt));
  const orgName = (laureate.orgName && laureate.orgName.toLowerCase().includes(coolPrompt))
  const knownName = (laureate.knownName && laureate.knownName.toLowerCase().includes(coolPrompt))
  const fullName = (laureate.fullName && laureate.fullName.toLowerCase().includes(coolPrompt));
  return filename || orgName || knownName || fullName;

}
function clearCache(cache, time) {
  setInterval(() => {
    cache = undefined;
  }, time);
}

export default router;