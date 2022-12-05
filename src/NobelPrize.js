import React, { useState, useEffect } from "react";
import Laureate from "./Laureate";
import{get} from "./RequestAPI";


export default function NobelPrize(props) {
    const [data, setData] = useState(null);
    useEffect(() => {

        get(props.index,1,(arr) => {setData(arr[0])})
    }, [props.index])
    return  data===null ? <div>loading...</div> :
    (<div className ="NobelPrize">
        <div> Award Year: {data.awardYear}</div>
        <div> Category: {data.category.en}</div>
        
        {data.laureates === undefined ? 
            <div>price was not given out</div> : 
            
            data.laureates.map((laureate) => {return <Laureate data={laureate} key={laureate.id} />})}
        <div> prizeAmount: {data.prizeAmount}</div>
        <div> prizeAmountAdjusted: {data.prizeAmountAdjusted}</div>
        
        
    </div>)
}