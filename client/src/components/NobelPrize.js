import React, { useState, useEffect } from "react";
import Laureate from "./Laureate";
import{get} from "../RequestAPI";


export default function NobelPrize(props) {
    return  props.data===null ? <div>loading...</div> :
    (<div className ="NobelPrize">
        <div> Award Year: {props.data.awardYear}</div>
        <div> Category: {props.data.category_en}</div>
        
        {props.data.laureates === undefined ? 
            <div>price was not given out</div> : 
            
            props.data.laureates.map((laureate) => {return <Laureate data={laureate} key={laureate.id} />})}
        <div> prizeAmount: {props.data.prizeAmount}</div>
        <div> prizeAmountAdjusted: {props.data.prizeAmountAdjusted}</div>
        
        
    </div>)
}