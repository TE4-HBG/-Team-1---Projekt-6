import { MongoClient, Db } from "mongodb";
const scaryString = "mongodb+srv://root:X1X8woKNt4rLtEs2@cluster0.eriyvi2.mongodb.net/?retryWrites=true&w=majority";
/**
 * @type {MongoClient | null}
 */
let _client = null;
export async function connectToServer() {
    const client = await (new MongoClient(scaryString,   {
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
export default {
    connectToServer,
    getDb,
};
