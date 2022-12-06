//import {UpdateResult, Collection } from "mongodb";
/**
 * @param {Collection<Document>} collection
 * @param {number} index
 * @param {*} object
 * @param {(object : *) => *} translateIntoDatabaseStructure
 * @param {(object : *) => number | undefined} getId
 * @returns {Promise<UpdateResult | Document>}
 */
export default function replaceOne(collection, index, object, translateIntoDatabaseStructure, getId) {
    return collection.replaceOne({_id: (getId ? getId(object) : index) }, translateIntoDatabaseStructure(object), {upsert:true})
}