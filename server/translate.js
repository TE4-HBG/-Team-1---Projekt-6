import "./NobelPrize.js";
import Database from "./Database.js";
const Laureate = Database.models.Laureate;
const NobelPrize = Database.models.Prize;


/**
 * 
 * @param {APINobelPrize} prize 
 * @param {number} index
 * @returns {NobelPrize}
 */
export function TranslateNobelPrize(prize) {
    return new NobelPrize({
        awardYear: prize.awardYear,
        category: prize.category.en,
        categoryFull: prize.categoryFullName.en,
        laureates: prize.laureates && prize.laureates.map((laureate) => Number(laureate.id)),
        prizeAmount: prize.prizeAmount,
        prizeAmountAdjusted: prize.prizeAmountAdjusted,
    });
}
/**
 * 
 * @param {APILaureate} laureate 
 * @param {number} index
 * @returns {Laureate}
 */
export function TranslateLaureate(laureate) {
    return new Laureate({
        _id: laureate.id,
        fileName: laureate.fileName,
        nobelPrizes: [],
        wikiData: laureate.wikiData && laureate.wikidata.url,
        wikiDataID: laureate.wikiData && laureate.wikidata.id,
        wikipedia: laureate.wikipedia.english,
        wikipediaID: laureate.wikipedia.slug,
        orgName: laureate.orgName && laureate.orgName.en,
        knownName: laureate.knownName && laureate.knownName.en,
        fullName: laureate.fullName && laureate.fullName.en,
    });
}

/**
 * 
 * @param {APILaureate} laureate 
 * @returns {number}
 */
export function LaureateID(laureate) {
    return laureate.id;
}