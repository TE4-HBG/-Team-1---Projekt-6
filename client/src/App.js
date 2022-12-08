import { Route, Routes } from "react-router-dom";
import { getCount, get } from "./RequestAPI";

import { Searchbar } from "./components/Searchbar"
import { HandleSearch, ReturnObjectIdOfLettersPrompt } from './components/handleSearch.js'
import { useEffect, useState } from 'react';
import Timer from "./components/Timer"
import NavbarDarkExample from './components/NavbarDarkExample';

import NobelPrize from "./components/NobelPrize";
import Popup from './components/Popup';
import LoginInfo from "./components/LoginInfo";

function App() {
  const [prompt, setPrompt] = useState("")
  const [nobelPrizes, setNobelPrizes] = useState(null);
  const [count, setCount] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [popupState, setPopupState] = useState(false);
  let queriedPrizes;
  useEffect(() => {
    getCount(setCount);
  }, [])

  useEffect(() => {
    if (count !== null) {
      get(0, count, setNobelPrizes);
    }
  }, [count]);

  useEffect(() => {


    if (prompt.length > 0) {
      setSearchResult(ReturnObjectIdOfLettersPrompt(nobelPrizes, prompt))
      console.log("search result set")
      /*console.log(nobelPrizes)
     
      queriedPrizes += nobelPrizes.filter((nobelPrize) => {
      return;
      });*/
    }

  }, [nobelPrizes, prompt])

  console.log(searchResult);
  return (
    <>

      <NavbarDarkExample />
      <Searchbar updatePrompt={setPrompt} />
      <HandleSearch prompt={prompt} lauretaes={queriedPrizes} />
      <Timer />
      <div className="Test">
        {
          searchResult !== null && searchResult.map((index) => { return <NobelPrize index={index} /> })
        }
      </div>
      <Popup state={popupState} setState={setPopupState} >
      <LoginInfo/>

        <div className="Create_User" >
          <button onClick={() => {alert(":)")}}>
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
