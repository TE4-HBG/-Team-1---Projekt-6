import logo from './logo.svg';
import './App.css';
import {ApiTest} from "./ApiTest"
import {Searchbar} from "./Searchbar"
import {HandleSearch, ReturnObjectIdOfLettersPrompt} from './handleSearch.js'
import { useEffect, useState } from 'react';
import { getCount, get } from "./RequestAPI";


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
      <Searchbar updatePrompt = {setPrompt} />
      <HandleSearch prompt = {prompt} lauretaes = {queriedPrizes} />
    </div>
  );
}

export default App;
