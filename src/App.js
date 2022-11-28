import logo from './logo.svg';
import './App.css';
import {ApiTest} from "./ApiTest"
import {Searchbar} from "./Searchbar"
import {HandleSearch} from './handleSearch.js'
import { useEffect, useState } from 'react';


function App() {

  
  const [prompt, setPrompt] = useState(null)
  useEffect(() => {
    
  }, [prompt])

  return (
    <div className="App">
      <Searchbar updatePrompt = {setPrompt} />
      <HandleSearch prompt = {prompt} />
    </div>
  );
}

export default App;
