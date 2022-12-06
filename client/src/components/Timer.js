import React, { useState, useEffect } from "react";
import { getCount, get } from "../RequestAPI";
import NobelPrize from "./NobelPrize";


const Timer = () => {
   
    const [count, setCount] = useState(null);
    const [nobelPrizeIndex, setNobelPrizeIndex] = useState(null);
    useEffect(() => {
        getCount(setCount);
        if (count) {
            setNobelPrizeIndex(randomNumberInRange(0, count));
        }
        const timer = setInterval(() => {
            getCount(setCount);
            if (count) {
                setNobelPrizeIndex(randomNumberInRange(0, count));
            }
        }, 300 * 1000);
        return () => {
            clearInterval(timer);
        }
    }, [count]);


    return (<div className ="Timer"> 
        {nobelPrizeIndex === null ?
        <div>Loading...</div> :
        <NobelPrize index={nobelPrizeIndex} />}
    </div>)

}

function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function displayinfo(nobelPrize) {
    let nobelprizeInfo = [];

    nobelprizeInfo.push(nobelPrize.category.en)
    nobelprizeInfo.push();

    if (nobelPrize.laureates !== undefined) {
        for (let j = 0; j < nobelPrize.laureates.length; j++) {
            if (nobelPrize.laureates[j].knownName !== undefined) {
                nobelprizeInfo.push(nobelPrize.laureates[j].knownName.en)
                nobelprizeInfo.push(" ");
            } else {
                nobelprizeInfo.push(nobelPrize.laureates[j].orgName.en)
                nobelprizeInfo.push(" ");
            }
            nobelprizeInfo.push(nobelPrize.laureates[j].motivation.en)
            nobelprizeInfo.push(" ");


        }

    }
    nobelprizeInfo.push(nobelPrize.prizeAmount)
    nobelprizeInfo.push(" ");
    nobelprizeInfo.push(nobelPrize.prizeAmountAdjusted)
    nobelprizeInfo.push(" ");
    return nobelprizeInfo;

}


export default Timer;
