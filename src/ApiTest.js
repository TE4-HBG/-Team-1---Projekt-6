import React, { useState, useEffect } from "react";
import { getCount, get } from "./RequestAPI";

export function ApiTest() {
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
    console.log(nobelPrizes);
    return <p>{nobelPrizes === null ? "loading" : JSON.stringify(nobelPrizes)}</p>
} 
