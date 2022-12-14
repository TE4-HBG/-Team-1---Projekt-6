import { Route, Routes } from "react-router-dom";
import { get } from "./RequestAPI";

import { Searchbar } from "./components/Searchbar"
import { useEffect, useState } from 'react';
import NavbarDarkExample from './components/NavbarDarkExample';

import Popup from './components/Popup';
import LoginInfo from "./components/LoginInfo";
import Laureate from "./components/Laureate";
import LaureateContainer from "./components/LaureateDisplay";

function App() {
  const [searchPrompt, setSearchPrompt] = useState("")
  const [popupState, setPopupState] = useState(false);

  return (
    <>

      <NavbarDarkExample searchBar={<Searchbar onSubmit={setSearchPrompt} />} />

      <LaureateContainer prompt={searchPrompt}></LaureateContainer>

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
