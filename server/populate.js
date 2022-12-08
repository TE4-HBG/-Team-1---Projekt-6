import Database from "./Database.js";
import replaceOne from "./mongodb.collection.replaceOne.js";
import { getLaureateCount, getLaureates, getNobelPrizeCount, getNobelPrizes } from "./RequestAPI.js";
import { LaureateID, TranslateLaureate, TranslateNobelPrize } from "./translate.js";

/**
 * 
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
export async function PopulatePrizesAndLaurates() {
    const prizes = await getNobelPrizes(0, await getNobelPrizeCount());
    const laureates = await getLaureates(0, await getLaureateCount());
    const laureateCollection = Database.GetLaureates();
    laureates.forEach(async (laureate, index) => {
        await replaceOne(laureateCollection, index, laureate, TranslateLaureate, LaureateID);
    });
    const prizeCollection = Database.GetPrizes();
    prizes.forEach(async (prize, index) => {

        await replaceOne(prizeCollection, index, prize, TranslateNobelPrize);
        if (prize.laureates) {
            await prize.laureates.forEach(async (laureate) => {
                await laureateCollection.updateOne({ _id: Number(laureate.id) }, { $push: { nobelPrizes: index } });
            })
        }
    });
}