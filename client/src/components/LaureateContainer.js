import { useEffect, useState, useRef } from "react";
import Laureate from "./Laureate";

const searchResult = {prompt: "", data: [], isRunning: false, shouldRun: false};
function FetchPromptData(prompt) {
    let shit = null
    do {

    } while(shit !== null);
}

export default function LaureateContainer(props) {

    const [activePrompt, setActivePrompt] = useState("");
    
    
    useEffect(() => {
        if (props.prompt.length !== 0) {
            console.log("got a new prompt");
            setActivePrompt(props.prompt);
            
        }
    }, [props.prompt])


    
    useEffect(() => {


        //DisableOldPromptFetches(activePrompt);
    }, [activePrompt])
    
    
    return <div /*ref={ref}*/ style={{ display: "flex", flexWrap: "wrap", alignContent: "flex-start", justifyContent: "space-evenly", alignItems: "flex-start" }}>
        {
            searchResult.data.map((data, i) => {
                return <Laureate data={data} key={`laurate-${props.prompt}-${i}`} />;
            })
        }
    </div>
}