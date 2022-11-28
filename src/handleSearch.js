import { getCount, get } from "./API";
import React, { useState, useEffect } from "react";

export function HandleSearch(props) {
    const [nobelPrizes, setNobelPrizes] = useState(null);
    const [count, setCount] = useState(null);
    useEffect(() => {
        getCount(setCount);
    }, [])
    useEffect(() => {
        if (count !== null) {
           get(0, count, setNobelPrizes);
        }
    }, [count]);
//Continue working here on monday
let queriedPrizes;
    if (props.prompt && props.prompt.length > 0) {
        console.log(nobelPrizes)
//handle search is an asshole fr fr 
        queriedPrizes += nobelPrizes.filter((nobelPrize) => {
        return nobelPrize.knownName.en/*<== JSON path*/.match(props.prompt);
        });
    }
    return <p>{queriedPrizes === null ? "loading" : JSON.stringify(nobelPrizes)}</p>
}