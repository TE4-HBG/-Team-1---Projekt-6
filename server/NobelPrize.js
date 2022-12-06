/**
 * @typedef Link
 * @prop {string} action
 * @prop {string} href
 * @prop {string} rel
 * @prop {string} types
 */


/**
 * @typedef {Object} APINobelPrize
 * @prop {number} awardYear
 * @prop {TranslatedString} category
 * @prop {TranslatedString} categoryFullName
 * @prop {APIMinLaureate[] | undefined} laureates
 * @prop {Link} links
 * @prop {number} prizeAmount
 * @prop {number} prizeAmountAdjusted
 */

/**
 * @typedef {Object} APIMinLaureate
 * @prop {TranslatedString | undefined} fullName
 * @prop {number} id
 * @prop {TranslatedString | undefined} knownName
 * @prop {TranslatedString | undefined} orgName
 * @prop {Link} links
 * @prop {TranslatedString} motivation
 * @prop {string} portion
 * @prop {number} sortOrder
 */

/**
 * @typedef {Object} TranslatedString
 * @prop {string | undefined} en
 * @prop {string | undefined} no
 * @prop {string | undefined} se
 */

/**
 * @typedef {Object} APILaureate
 * @prop {TimeAndPlace} birth
 * @prop {TimeAndPlace | undefined} death
 * @prop {TranslatedString} familyName
 * @prop {string} fileName
 * @prop {TranslatedString} fullName
 * @prop {string} gender
 * @prop {TranslatedString} givenName
 * @prop {number} id
 * @prop {TranslatedString} knownName
 * 
 */
/**
 * @typedef APIMinNobelPrize
 * @prop {undefined} pain
 */
/**
 * @typedef {Object} TimeAndPlace
 * @prop {string} date
 * @prop {Place} place
 */
/**
 * @typedef {Object} Place
 * @prop {TranslatedString} city
 * @prop {TranslatedString} cityNow
 * @prop {TranslatedString} continent
 * @prop {TranslatedString} country
 * @prop {TranslatedString} countryNow
 * @prop {TranslatedString} locationString
 */