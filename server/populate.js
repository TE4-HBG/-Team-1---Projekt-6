import Database from "./Database.js";
import replaceOne from "./replaceOne.js";
import { getLaureateCount, getLaureates, getNobelPrizeCount, getNobelPrizes } from "./RequestAPI.js";
import { LaureateID, TranslateLaureate, TranslateNobelPrize } from "./translate.js";

/** 
 * @deprecated
 * @param {Collection<Document>} collection
 * @param {() => Promise<number>} apiCount 
 * @param {(offset, limit) => Promise<any[]>} apiGet 
 * @param {(object, index) => Object} translateIntoDatabaseStructure 
 * @param {(object) => number | undefined} getId
 * @returns {Promise<(UpdateResult | Document)[]>}
 */
export default async function PopulateCollection(collection, apiCount, apiGet, translateIntoDatabaseStructure, getId) {
    const objects = await apiGet(0, await apiCount());
    /**
     * @type {(UpdateResult | Document)[]}
     */
    const result = []
    objects.forEach(async (object, index) => {
        result.push(await replaceOne(collection, index, object, translateIntoDatabaseStructure, getId));
    });
    return result;
}
/**
 * 1) Fethes data from the Nobel Prize API
 * 2) Translates that data (mainly to remove unnecesary shit when we put it in the database)
 * 3) Push that data into the database.
 * 4) ???
 * 5) Profit.
 */
export async function PopulatePrizesAndLaurates() {
    const prizes = await getNobelPrizes(0, await getNobelPrizeCount());
    const laureates = await getLaureates(0, await getLaureateCount());
    laureates.forEach(async (laureate, index) => {
        replaceOne(Database.models.Laureate, index, laureate, TranslateLaureate, LaureateID);
    });
    prizes.forEach(async (prize, index) => {
        replaceOne(Database.models.Prize, index, prize, TranslateNobelPrize);
        if (prize.laureates) {
            await prize.laureates.forEach(async (laureate) => {
                await Database.models.Laureate.updateOne({ _id: Number(laureate.id) }, { $push: { nobelPrizes: index } });
            })
        }
    });
}