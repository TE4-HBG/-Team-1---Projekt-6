//import './App.css';
import { ApiTest } from "./ApiTest"
import { Searchbar } from "./Searchbar"
import { HandleSearch, ReturnObjectIdOfLettersPrompt } from './handleSearch.js'
import { useEffect, useState } from 'react';
import { getCount, get } from "./RequestAPI";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Timer from "./Timer"
import NobelPrize from "./NobelPrize";
import Popup from './components/Modal/Popup';


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

  }, [prompt])

  console.log(searchResult);
  return (
    <div className="App">

      <NavbarDarkExample loginClick={function () { setPopupState(!popupState) }} />
      <Searchbar updatePrompt={setPrompt} />
      <HandleSearch prompt={prompt} lauretaes={queriedPrizes} />
      <Timer />
      <div className="Test">
        {
          searchResult !== null && searchResult.map((index) => { return <NobelPrize index={index} /> })
        }
      </div>
      <Popup state={popupState} setState={setPopupState} >
        <div className="LoginForm">
        <h2 className="Title">
          Login! 
        </h2>
        </div>
        <div>
          <h5 className="TextPromtForUsername"> 
            Username or E-mail adress:
          </h5>
          <input className="Username" type={Text}>
          </input>
        </div>
        <div>
          <h5 className="TextPromtForPassword">
            Password:
          </h5>
          <input className="Password" type={Text}>

          </input>
        </div>
        <div className="Sign_in">
          <button onclick={alert="Sign in"}>
          <h6>
            Sign in!
          </h6>
          </button>
        </div>

        <div className="Create_User" >
          <button onclick={alert="NewUser"}>
          <h6>
            Create account!
          </h6>
          </button>
        </div>

      </Popup>

    </div>
  );
}

export function NavbarDarkExample(props) {

  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className="Login" href="#home">NOBELFINDER</Navbar.Brand>
        <Navbar.Brand>
          <button onClick={props.loginClick}>
            Login!
      </button>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="FILTER"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">YEAR</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">CATEGORY</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">MOST POPULAR</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                TEAM 1 PRODUCTION
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}


export default App;
