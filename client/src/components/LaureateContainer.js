import { useEffect, useState } from "react";
import Laureate from "./Laureate";
import PromptFetcher from "../promptFetcher";


export default function LaureateContainer(props) {
    const [dataArray, setDataArray] = useState([]);
    const [promptFetcher] = useState(new PromptFetcher(setDataArray));
    useEffect(() => {
        if (props.prompt.length !== 0) {
            console.log("got a new prompt");
            promptFetcher.start(props.prompt);
        }
    }, [promptFetcher, props.prompt])


    return <div /*ref={ref}*/ style={{ display: "flex", flexWrap: "wrap", alignContent: "flex-start", justifyContent: "space-evenly", alignItems: "flex-start" }}>
        {
            dataArray.map((data, i) => {
                return <Laureate data={data} key={`laurate-${props.prompt}-${i}`} />;
            })
        }
    </div>
}