import { Router } from "express";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = Router();

// This will help us connect to the database
import { getDb } from "../db/conn.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, res) {
  const db_connect = getDb();
  const swag = await db_connect
    .collection("records")
    .find({})
    .toArray();
  res.json(swag);
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
  const db_connect = getDb();
  const myquery = { _id: ObjectId(req.params.id) };
  const document = db_connect
    .collection("records")
    .findOne(myquery);
  res.json(document);
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(async function (req, res) {
  let db_connect = getDb();
  let myobj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  const collection = await db_connect.collection("records").insertOne(myobj);
  res.json(collection);
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(async function (req, res) {
  let db_connect = getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  const result = await db_connect
    .collection("records")
    .updateOne(myquery, newvalues);
  console.log("1 document updated");
  res.json(result);
});

// This section will help you delete a record
recordRoutes.route("/:id").delete(async function (req, res) {
  let db_connect = getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let result = await db_connect
    .collection("records")
    .deleteOne(myquery);
  console.log("1 document deleted");
  res.json(result);
});

export default recordRoutes;