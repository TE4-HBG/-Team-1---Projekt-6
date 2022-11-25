import React, { useState, useEffect } from "react";

export function ApiTest() {
    const [nobelPrizes, setNobelPrizes] = useState(null);
    const [count, setCount] = useState(null);
    useEffect(() => {
        const req = new XMLHttpRequest();
        req.addEventListener("load", ({ target }) => {
            setCount(JSON.parse(target.responseText).meta.count);
        });
        req.open("GET", "https://api.nobelprize.org/2.0/nobelPrizes?limit=1");
        req.send();
    }, [])
    useEffect(() => {
        if (count) {
            const req = new XMLHttpRequest();
            req.addEventListener("load", ({ target }) => {
                setNobelPrizes(JSON.parse(target.responseText).nobelPrizes);
            });
            req.open("GET", `https://api.nobelprize.org/2.0/nobelPrizes?limit=${count}`);
            req.send();
        }
    }, [count]);
    console.log(nobelPrizes);
    return <p>{nobelPrizes === null ? "loading" : nobelPrizes[0].awardYear}</p>
} 