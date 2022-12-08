//import {UpdateResult, Collection } from "mongodb";
import { ObjectId } from "mongodb";
/**
 * @param {Collection<Document>} collection
 * @param {number} index
 * @param {*} object
 * @param {(object : *) => *} translateIntoDatabaseStructure
 * @param {((object : *) => number) | undefined} getId
 * @returns {Promise<UpdateResult | Document>}
 */
export default function replaceOne(collection, index, object, translateIntoDatabaseStructure, getId = undefined) {
    return collection.replaceOne({ _id: Number(getId === undefined ? index : getId(object)) }, translateIntoDatabaseStructure(object), { upsert: true })
}