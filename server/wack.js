export default function replaceOne(collection, index, object, translateIntoDatabaseStructure, getId) {
    return collection.replaceOne({_id: (getId ? getId(object) : index) }, translateIntoDatabaseStructure(object), {upsert:true})
}