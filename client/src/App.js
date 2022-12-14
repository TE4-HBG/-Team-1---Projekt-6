import { Route, Routes } from "react-router-dom";

import { Searchbar } from "./components/Searchbar"
import { useState } from 'react';
import NavbarDarkExample from './components/NavbarDarkExample';

import Popup from './components/Popup';
import LoginInfo from "./components/LoginInfo";
import LaureateContainer from "./components/LaureateDisplay";

function App() {
  const [searchPrompt, setSearchPrompt] = useState("")
  const [popupState, setPopupState] = useState(false);

  return (
    <>

      <NavbarDarkExample searchBar={<Searchbar onSubmit={setSearchPrompt} />} popupButton={<button onClick={function () { setPopupState(!popupState) }}>
        Login!
      </button>} />
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
