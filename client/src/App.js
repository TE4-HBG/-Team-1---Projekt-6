import { Route, Routes } from "react-router-dom";
//import './App.css';
import {ApiTest} from "./ApiTest"
import {Searchbar} from "./Searchbar"
import {HandleSearch, ReturnObjectIdOfLettersPrompt} from './handleSearch.js'
import { useEffect, useState } from 'react';
import { getCount, get } from "./RequestAPI";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Timer from "./Timer"
import NobelPrize from "./NobelPrize";

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
      
  }, [prompt])
  
  console.log(searchResult);
  return (
    <div className="App">
      
      <NavbarDarkExample />
      <Searchbar updatePrompt = {setPrompt} />
      <HandleSearch prompt = {prompt} lauretaes = {queriedPrizes} />
      <Timer/>
      <div className="Test"> 
      {
        searchResult !== null && searchResult.map((index) => {return <NobelPrize index = {index} />})
      }
      </div>
    </div>
  );
}

export function NavbarDarkExample() {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">NOBELFINDER</Navbar.Brand>
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
