import { MongoClient, Db } from "mongodb";
/**
 * @type {MongoClient | null}
 */
let _client = null;
export async function connectToMongoDB() {
    const client = await (new MongoClient(process.env.ATLAS_URI,   {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).connect());
    console.log("Connected to database")
    _client = client;
};

/**
 * @param {string | undefined} name
 * @param {DbOptions | undefined} options 
 * @returns {Db}
 */
export function getDb(name, options) {
    return _client.db(name, options);
};
