import React, { useState, useEffect } from "react";

export function HandleSearch(props) {

    return <p>{props.laureates === null ? "loading" : props.laureates}</p>
}

export function ReturnObjectIdOfLettersPrompt(nobelPrizes, prompt) {
    let idArray = [];
    for (let i = 0; i < nobelPrizes.length; i++) {
        try {
            for (let j = 0; j < nobelPrizes[i].laureates.length; j++) {     
            try {
                if (prompt === nobelPrizes[i].laureates[j].fullName.en || prompt === nobelPrizes[i].laureates[j].knownName.en) {
                    
                    idArray.push(i)
                    break
                }
            }
            catch {
             if (prompt === nobelPrizes[i].laureates[j].orgName.en) {
                 idArray.push(i)
             }
            }
 
         }
        }
        catch {
        }
       
        /*for (let j = 0; j < array.length; j++) {
            const element = array[j];
            
        } */
    }

    console.log("finished :DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
    return idArray;
}