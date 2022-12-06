import { Route, Routes } from "react-router-dom";
import { getCount, get } from "./RequestAPI";


import { Searchbar } from "./components/Searchbar"
import { HandleSearch, ReturnObjectIdOfLettersPrompt } from './components/handleSearch.js'
import { useEffect, useState } from 'react';
import Timer from "./components/Timer"
import NavbarDarkExample from './components/NavbarDarkExample';

import NobelPrize from "./components/NobelPrize";

function App() {
  const [prompt, setPrompt] = useState("")
  const [nobelPrizes, setNobelPrizes] = useState(null);
  const [count, setCount] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
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
    <div className="App">

      <NavbarDarkExample />
      <Searchbar updatePrompt={setPrompt} />
      <HandleSearch prompt={prompt} lauretaes={queriedPrizes} />
      <Timer />
      <div className="Test">
        {
          searchResult !== null && searchResult.map((index) => { return <NobelPrize index={index} /> })
        }
      </div>
    </div>
  );
}

export default App;
