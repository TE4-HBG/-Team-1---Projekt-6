//import {UpdateResult, Collection } from "mongodb";
import { Model } from "mongoose"
/**
 * @param {Model} model
 * @param {number} index
 * @param {*} object
 * @param {(object : *) => Model} modelTranslator
 * @param {((object : *) => number) | undefined} getId
 * @returns {Promise<UpdateResult | Document>}
 */
export default function replaceOne(model, index, object, modelTranslator, getId = undefined) {
    model.replaceOne({  _id: getId === undefined ? index : getId(object)}, modelTranslator(object), {upsert: true}, (err, res) => {
        if(err) {
            console.error(err);
        } else {
            console.log(res);
        }

    })
    //return collection.replaceOne({ _id: Number(getId === undefined ? index : getId(object)) }, modelTranslator(object), { upsert: true })
}