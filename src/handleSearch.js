import { getCount, get } from "./API";
import React, { useState, useEffect } from "react";

export function HandleSearch(props) {
    const [nobelPrizes, setNobelPrizes] = useState(null);
    const [count, setCount] = useState(null);
    const [prompt, setPrompt] = useState(null);
    setPrompt(props.prompt)
    console.log(props.prompt);
    useEffect(() => {
        getCount(setCount);
    }, [])
    useEffect(() => {
        if (count !== null) {
           get(0, count, setNobelPrizes);
        }
    }, [count]);
//Continue working here on monday
    if (prompt.length > 0) {
        nobelPrizes.filter((noblePrize) => {
        return noblePrize.fullName.match(prompt);
    });
    }
    return <p>{nobelPrizes === null ? "loading" : JSON.stringify(nobelPrizes)}</p>
}