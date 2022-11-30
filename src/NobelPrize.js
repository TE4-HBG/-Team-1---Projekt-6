import React, { useState, useEffect } from "react";
import Laureate from "./Laureate";


export default function NobelPrize(props) {
    return (<div>
        <div> {props.data.awardYear}</div>
        <div>{props.data.category.en}</div>
        {props.data.laureates === undefined ? 
            <div>price was not given out</div> : 
            props.data.laureates.map((laureate) => {return <Laureate data={laureate} key={laureate.id} />})}
        <div>{props.data.prizeAmount}</div>
        <div>{props.data.prizeAmountAdjusted}</div>
    </div>)
}