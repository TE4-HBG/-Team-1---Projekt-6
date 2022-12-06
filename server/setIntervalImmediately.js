/**
 * 
 * @param {() => void} callback 
 * @param {number | undefined} ms 
 */
export default async function setIntervalImmediately(callback, ms = undefined) {
    callback();
    setInterval(callback, ms);
}