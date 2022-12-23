import { Route, Routes } from "react-router-dom";

import { Searchbar } from "./components/Searchbar"
import { useState } from 'react';
import NavbarDarkExample from './components/NavbarDarkExample';

import Popup from './components/Popup';
import LoginInfo from "./components/LoginInfo";
import LaureateContainer from "./components/LaureateContainer";

import background from './background.png';
import './App.css'; // Import the App.css stylesheet

function App() {
  const [searchPrompt, setSearchPrompt] = useState("")
  const [popupState, setPopupState] = useState(false);
  
  return (
    <>
      <NavbarDarkExample searchBar={<Searchbar onSubmit={setSearchPrompt} />} popupButton={<button onClick={function () { setPopupState(!popupState) }}>
        Login!
      </button>} />

      <div className="App" style={{ 
      backgroundImage: `url(${background})`, // Set the  background image
      backgroundSize: 'cover', // Make the background image cover the entire div element
      backgroundPosition: 'center' // Center the background image
    }}>
        <LaureateContainer prompt={searchPrompt}></LaureateContainer>
        <p>test</p>
      </div>

      <Popup state={popupState} setState={setPopupState} >

      </Popup>
    </>
  );
}

export default App;
