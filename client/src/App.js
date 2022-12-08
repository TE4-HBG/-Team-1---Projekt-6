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

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchPrompt, setSearchPrompt] = useState("")
  const [popupState, setPopupState] = useState(false);

  useEffect(() => {
    if (searchPrompt.length < 0) {
      setSearchResult([null]);

    }
  }, [searchPrompt])

  useEffect(() => {
    if (searchResult.length !== 0) {
      if (searchResult[searchResult.length] === null) {
        get("laureate", searchPrompt, searchResult.length, (result) => {
          if (result === null) {
            setSearchPrompt((previous) => { previous.pop(); return previous; })
          } else {
            setSearchPrompt((previous) => {
              previous[searchResult.length] = result;
              previous.push(null);
            })

          }
        })
      }
    }
  }, [searchResult, searchPrompt])

  return (
    <>

      <NavbarDarkExample />
      <Searchbar updatePrompt={setSearchPrompt} />

      <div className="Test">
        {
          searchResult !== null && searchResult.map((index) => { return <NobelPrize index={index} /> })
        }
      </div>
      <Timer />
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
