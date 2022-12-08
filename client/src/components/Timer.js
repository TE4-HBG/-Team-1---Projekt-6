import React, { useState, useEffect } from "react";
import { random } from "../RequestAPI";
import Laureate from "./Laureate";
import NobelPrize from "./NobelPrize";



export const Timer = () => {
    const [data, setData] = useState(null);


    function SetData() {
        random("laureate", 1, (arr) => { setData(arr[0]) });
    }

    useEffect(() => {
        SetData()
        const intervalID = setInterval(SetData, 86_400_000);
        return function () { clearInterval(intervalID); }
    }, []);


    return (
        <div className="Timer" style={
            {
                backgroundColor: "#333",
            }
            }>
            <h2 style={{ color: "#fff" }}>Laureate of the day</h2>
            <Laureate data={data} />
        </div>
    )

}
export default Timer;
