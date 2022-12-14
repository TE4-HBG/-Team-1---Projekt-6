import { MongoClient, Db, Collection } from "mongodb";
/**
 * @type {Db | null}
 */
let _db = null;


export default {
    Connect: async () => {
        _db = (await (new MongoClient(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).connect())).db("NobelPrizes");
        console.log("Connected to database")
    },

    /**
     * @returns {Db}
     */
    Get: () => {
        return _db;
    },
    /**
     * 
     * @returns {Collection}
     */
    GetLaureates: () => {
        return _db.collection("Laureates")
    },
    /**
     * 
     * @returns {Collection}
     */
    GetPrizes: () => {
        return _db.collection("Prizes")
    },
    /**
     * 
     * @returns {Collection}
     */
    GetUsers: () => {
        return _db.collection("Users");
    },
    CreateUser: (Username, Password) => {
        const users =  _db.collection("Users");
         return users.insertOne({username: Username, password: Password, favoriteLaureates: [], favoritePrizes: []});
        
    }
} 
