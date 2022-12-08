import React, { useState, useEffect } from "react";
import { random } from "../RequestAPI";
import NobelPrize from "./NobelPrize";



export const Timer = () => {
    const [data, setData] = useState(null);


    function SetData() {
        random("laureate", 1, (arr) => { setData(arr[0]) });
    }

    useEffect(() => {
        SetData()
        const intervalID = setInterval(SetData, 300 * 1000);
        return function () { clearInterval(intervalID); }
    });


    return (
        <div className="Timer">
            <NobelPrize data={data} />
        </div>
    )

}
export default Timer;
