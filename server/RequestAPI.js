import { request } from "https"
import delay from "./delay.js";
/**
 * @param {number} timeout 
 * @param {number} precision 
 * @returns {Promise<number>}
 */
export async function getNobelPrizeCount(timeout = 10000.0, precision = 100.0) {
    let data = "";
    let finished = false;
    const req = request({ hostname: "api.nobelprize.org", path: "/2.1/nobelPrizes?limit=1&offset=0", method: "GET" }, (res) => {
        res.on('data', (chunk) => data += chunk.toString());
        res.on("end", () => finished = true);
        res.on("error", (e) => { throw e; });
    });
    req.on('error', (e) => { throw e; });
    req.end();

    for (let timer = 0.0; timer < timeout; timer += precision) {
        if (finished) {
            console.log("success!")
            return JSON.parse(data).meta.count;
        }
        console.log(`waiting: ${timer + precision}`)

        await delay(precision);
    }
    throw "timed out";
}
/**
 * @param {number} timeout 
 * @param {number} precision 
 * @returns {Promise<number>}
 */
export async function getLaureateCount(timeout = 10000.0, precision = 100.0) {
    let data = "";
    let finished = false;
    const req = request({ hostname: "api.nobelprize.org", path: "/2.1/laureates?limit=1&offset=0", method: "GET" }, (res) => {
        res.on('data', (chunk) => data += chunk.toString());
        res.on("end", () => finished = true);
        res.on("error", (e) => { throw e; });
    });
    req.on('error', (e) => { throw e; });
    req.end();

    for (let timer = 0.0; timer < timeout; timer += precision) {
        if (finished) {
            console.log("success!")
            return JSON.parse(data).meta.count;
        }
        console.log(`waiting: ${timer + precision}`)

        await delay(precision);
    }
    throw "timed out";
}
/**
 * 
 * @param {number} offset 
 * @param {number} limit 
 * @param {number} timeout 
 * @param {number} precision 
 * @returns {Promise<APINobelPrize[]>}
 */
export async function getNobelPrizes(offset, limit, timeout = 10000.0, precision = 100.0) {
    let data = "";
    let finished = false;
    const req = request({ hostname: "api.nobelprize.org", path: `/2.1/nobelPrizes?limit=${limit}&offset=${offset}`, method: "GET" }, (res) => {
        res.on('data', (chunk) => data += chunk.toString());
        res.on("end", () => finished = true);
        res.on("error", (e) => { throw e; });
    });
    req.on('error', (e) => { throw e; });
    req.end();

    for (let timer = 0.0; timer < timeout; timer += precision) {
        if (finished) {
            console.log("success!")
            return JSON.parse(data).nobelPrizes;
        }
        console.log(`waiting: ${timer + precision}`)

        await delay(precision);
    }
    throw "timed out";
}
/**
 * @param {number} offset 
 * @param {number} limit 
 * @param {number} timeout 
 * @param {number} precision 
 * @returns {Promise<APILaureate[]>}
 */
export async function getLaureates(offset, limit, timeout = 180000.0, precision = 100.0) {
    let data = "";
    let finished = false;
    const req = request({ hostname: "api.nobelprize.org", path: `/2.1/laureates?limit=${limit}&offset=${offset}`, method: "GET" }, (res) => {
        res.on('data', (chunk) => data += chunk.toString());
        res.on("end", () => finished = true);
        res.on("error", (e) => { throw e; });
    });
    req.on('error', (e) => { throw e; });
    req.end();

    for (let timer = 0.0; timer < timeout; timer += precision) {
        if (finished) {
            console.log("success!")
            return JSON.parse(data).laureates;
        }
        console.log(`waiting: ${timer + precision}`)
        await delay(precision);
    }
    throw "timed out";
}
export async function getLaureate(id, timeout = 10000.0, precision = 100.0) {
    let data = "";
    let finished = false;
    const req = request({ hostname: "api.nobelprize.org", path: `/2.1/laureate/${id}`, method: "GET" }, (res) => {
        res.on('data', (chunk) => data += chunk.toString());
        res.on("end", () => finished = true);
        res.on("error", (e) => { throw e; });
    });
    req.on('error', (e) => { throw e; });
    req.end();

    for (let timer = 0.0; timer < timeout; timer += precision) {
        if (finished) {
            console.log("success!")
            return JSON.parse(data)[0];
        }
        console.log(`waiting: ${timer + precision}`)
        await delay(precision);
    }
    throw "timed out";
}