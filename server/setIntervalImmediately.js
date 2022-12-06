/**
 * 
 * @param {() => void} callback 
 * @param {number | undefined} ms 
 * @return {Promise<NodeJS.Timer>}
 */
export default async function setIntervalImmediately(callback, ms = undefined) {
    callback();
    return setInterval(callback, ms);
}