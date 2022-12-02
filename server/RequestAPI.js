/**
 * @param {number} timeout 
 * @param {number} precision 
 * @returns {number}
 */
export function getNobelPrizeCount(timeout = 10000.0, precision = 100.0) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.responseType = "json";
        req.open("GET", `https://api.nobelprize.org/2.1/nobelPrizes?limit=1&offset=0`);
        req.send();

        for (let timer = 0.0; timer < timeout; index += precision) {
            if(req.status == XMLHttpRequest.DONE) {
                resolve(req.response.meta.count)
                return;
            }
        }
        reject("timed out");
    })
}
/**
 * @param {number} timeout 
 * @param {number} precision 
 * @returns {number}
 */
export function getLaureateCount(timeout = 10000.0, precision = 100.0) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.responseType = "json";
        req.open("GET", `https://api.nobelprize.org/2.1/laureates?limit=1&offset=0`);
        req.send();

        for (let timer = 0.0; timer < timeout; index += precision) {
            if(req.status == XMLHttpRequest.DONE) {
                resolve(req.response.meta.count)
                return;
            }
        }
        reject("timed out");
    })
}
/**
 * 
 * @param {number} offset 
 * @param {number} limit 
 * @param {number} timeout 
 * @param {number} precision 
 * @returns {NobelPrize[]}
 */
export function getNobelPrizes(offset, limit, timeout = 10000.0, precision = 100.0) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.responseType = "json";
        req.open("GET", `https://api.nobelprize.org/2.0/nobelPrizes?limit=${limit}&offset=${offset}`);
        req.send();

        for (let timer = 0.0; timer < timeout; index += precision) {
            if(req.status == XMLHttpRequest.DONE) {
                resolve(req.response.nobelPrizes)
                return;
            }
        }
        reject("timed out");
    })
}
/**
 * @param {number} offset 
 * @param {number} limit 
 * @param {number} timeout 
 * @param {number} precision 
 * @returns {Laureate[]}
 */
 export function getLaureates(offset, limit, timeout = 10000.0, precision = 100.0) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.responseType = "json";
        req.open("GET", `https://api.nobelprize.org/2.1/laureates?limit=${limit}&offset=${offset}`);
        req.send();

        for (let timer = 0.0; timer < timeout; index += precision) {
            if(req.status == XMLHttpRequest.DONE) {
                resolve(req.response.laureates)
                return;
            }
        }
        reject("timed out");
    })
}