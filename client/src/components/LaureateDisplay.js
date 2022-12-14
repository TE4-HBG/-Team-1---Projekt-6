import { useEffect, useState, useRef } from "react";
import Laureate from "./Laureate";
/*
const MaxAmountOnRow = 4;

function clamp(min, x, max) {
    return Math.min(Math.max(x, min), max);
}

function getCountForRow(row, count) {
    return clamp(0, count - row * MaxAmountOnRow, 4);
}

function getPos(i, count) {
    const y = Math.floor(i / MaxAmountOnRow);
    const x = ((i % MaxAmountOnRow) + 0.5) / getCountForRow(y, count);
    return [x, y];
}
*/
const searchResults = {};

function DisableOldPromptFetches(activePrompt) {
    Object.keys(searchResults).forEach((key) => {
        if (key !== activePrompt) {
            if(searchResults[key].isRunning) {
                searchResults[key].shouldRun = false;
            }
        }
    });
}
function FetchPromptData(prompt) {

}

export default function LaureateContainer(props) {

    const [activePrompt, setActivePrompt] = useState("");

    
    useEffect(() => {
        if (props.prompt.length !== 0) {
            console.log("got a new prompt");
            setActivePrompt(props.prompt);
            searchResults[props.prompt] = { shouldRun: true, isRunning: false, data: [] };
        }
    }, [props.prompt])


    
    useEffect(() => {


        DisableOldPromptFetches(activePrompt);
    }, [activePrompt])
    /*
    useEffect(() => {
        console.log("search result changed!")
        if (searchResult.length !== 0) {
    
          if (searchResult[searchResult.length - 1] === null) {
            get("laureate", searchPrompt, searchResult.length - 1, (result) => {
              console.log("got the stuff");
              if (result === null) {
                console.log("nothing new");
                setSearchResult((previous) => { previous.pop(); return [...previous]; })
              } else {
                console.log("but wait, there's more");
    
                setSearchResult((previous) => {
                  previous[searchResult.length - 1] = result;
                  previous.push(null);
                  return [...previous];
                })
    
              }
            })
          }
        }
      }, [searchPrompt, searchResult])
    */

    /*
    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    const [displayedDatas, setDisplayedDatas] = useState([]);
    useEffect(() => {
        const sizeY = ref.current.clientHeight / window.innerHeight;
        const scrollY = window.scrollY / window.innerHeight;

        if (sizeY - scrollY < 1.5 && index < props.datas.length) {
            setIndex(i => i + 1);
            setDisplayedDatas(props.datas.slice(0,index));
        }
    }, [index, props.datas])

    */
    return <div /*ref={ref}*/ style={{ display: "flex", flexWrap: "wrap", alignContent: "flex-start", justifyContent: "space-evenly", alignItems: "flex-start" }}>
        {
            Object.keys(searchResults).map((data, i) => {
                return <Laureate data={data} key={`laurate-${props.prompt}-${i}`} />;
            })
        }
    </div>
}