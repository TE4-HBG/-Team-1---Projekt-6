import React, { useState, useEffect } from "react";

export function HandleSearch(props) {

    return <p>{props.laureates === null ? "loading" : props.laureates}</p>
}

export function ReturnObjectIdOfLettersPrompt(nobelPrizes, prompt) {
    let idArray = [];
    console.log(nobelPrizes);
    for (let i = 0; i < nobelPrizes.length; i++) {
        try {
            for (let j = 0; j < nobelPrizes[i].laureates.length; j++) {     
                try {
                    if (nobelPrizes[i].laureates[j].fullName.en.toLowerCase().includes(prompt.toLowerCase()) || nobelPrizes[i].laureates[j].knownName.en.toLowerCase().includes(prompt.toLowerCase())) {

                        idArray.push(i)
                        break;
                    }
                }
                catch {
                    if (nobelPrizes[i].laureates[j].orgName.en.toLowerCase().includes(prompt.toLowerCase())) {
                        idArray.push(i)
                    }
                }
            }
        }
        catch {
            console.log("caught")
        }
       
        /*for (let j = 0; j < array.length; j++) {
            const element = array[j];
            
        } */
    }

    console.log("finished :DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
    return idArray;
}
