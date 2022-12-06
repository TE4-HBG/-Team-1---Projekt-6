import "./NobelPrize.js";

/**
 * 
 * @param {APINobelPrize} prize 
 * @param {number} index
 * @returns {*}
 */
export function TranslateNobelPrize(prize) {
    return {
        awardYear: prize.awardYear,
        category_en: prize.category.en,
        category_no: prize.category.no,
        category_se: prize.category.se,
        categoryFull_en: prize.categoryFullName.en,
        categoryFull_no: prize.categoryFullName.no,
        categoryFull_se: prize.categoryFullName.se,
        laureates: prize.laureates === undefined ? undefined : prize.laureates.map((laureate) => {
            return laureate.id;
        }),
        prizeAmount: prize.prizeAmount,
        prizeAmountAdjusted: prize.prizeAmountAdjusted,
    };
}
/**
 * 
 * @param {APILaureate} laureate 
 * @param {number} index
 * @returns {*}
 */
export function TranslateLaureate(laureate, index) {
    const isOrganisation = laureate.orgName !== undefined;
    let object = {
        fileName: laureate.fileName,
        nobelPrizes: undefined
    }
    if (laureate.wikipedia) {
        object.wikipedia = laureate.wikipedia.english;
    }
    if (laureate.wikiData) {
        object.wikiData = laureate.wikiData.url;
    }
    if (isOrganisation) {
        object.orgName = laureate.orgName.en;
    } else {
        object.knownName = laureate.knownName.en;
    }
    return object;
}

/**
 * 
 * @param {APILaureate} laureate 
 * @returns {number}
 */
export function LaureateID(laureate) {
    return laureate.id;
}