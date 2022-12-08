import { Route, Routes } from "react-router-dom";
import { get } from "./RequestAPI";

import { Searchbar } from "./components/Searchbar"
import { HandleSearch, ReturnObjectIdOfLettersPrompt } from './components/handleSearch.js'
import { useEffect, useState } from 'react';
import Timer from "./components/Timer"
import NavbarDarkExample from './components/NavbarDarkExample';

import NobelPrize from "./components/NobelPrize";
import Popup from './components/Popup';
import LoginInfo from "./components/LoginInfo";
import Laureate from "./components/Laureate";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchPrompt, setSearchPrompt] = useState("")
  const [popupState, setPopupState] = useState(false);

  useEffect(() => {
    if (searchPrompt.length !== 0) {
      console.log("this should run");
      setSearchResult([null]);

    }
  }, [searchPrompt])

  useEffect(() => {

    if (searchResult.length !== 0) {

      if (searchResult[searchResult.length - 1] === null) {
        get("laureate", searchPrompt, searchResult.length - 1, (result) => {
          console.log("got the stuff");
          if (result === null) {
            console.log("nothing new");
            setSearchResult((previous) => { previous.pop(); return previous; })
          } else {
            console.log("but wait, there's more");

            setSearchResult((previous) => {
              previous[searchResult.length] = result;
              previous.push(null);
            })

          }
        })
      }
    }
  }, [searchResult])

  return (
    <>

      <NavbarDarkExample />
      <Timer />
      <Searchbar onSubmit={setSearchPrompt} />

      <div className="Test">
        {
          searchResult !== null && searchResult.map((data) => { return <Laureate data={data} /> })
        }
      </div>

      <Popup state={popupState} setState={setPopupState} >
        <LoginInfo />

        <div className="Create_User" >
          <button onClick={() => { alert(":)") }}>
            <h6>
              Create account!
            </h6>
          </button>
        </div>

      </Popup>
    </>
  );
}

export default App;
