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