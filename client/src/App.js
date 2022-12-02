import { Route, Routes } from "react-router-dom";
import { getCount, get } from "./RequestAPI";


import { Searchbar } from "./components/Searchbar"
import { HandleSearch, ReturnObjectIdOfLettersPrompt } from './components/handleSearch.js'
import { useEffect, useState } from 'react';
import Timer from "./Timer"
import NavbarDarkExample from './components/NavbarDarkExample';


function App() {
  const [prompt, setPrompt] = useState("")
  const [nobelPrizes, setNobelPrizes] = useState(null);
  const [count, setCount] = useState(null);
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
      console.log(ReturnObjectIdOfLettersPrompt(nobelPrizes, prompt))
      /*console.log(nobelPrizes)
     
      queriedPrizes += nobelPrizes.filter((nobelPrize) => {
      return;
      });*/
    }

  }, [prompt])


  return (
    <div className="App">

      <NavbarDarkExample />
      <Searchbar updatePrompt={setPrompt} />
      <HandleSearch prompt={prompt} lauretaes={queriedPrizes} />
      <div className="testTimer">
        <Timer />
      </div>
    </div>
  );
}

export default App;
