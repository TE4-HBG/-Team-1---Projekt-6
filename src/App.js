import logo from './logo.svg';
import './App.css';
import {ApiTest} from "./ApiTest"
import {Searchbar} from "./Searchbar"
import {HandleSearch} from './handleSearch.js'


function App() {
  return (
    <div className="App">
      <Searchbar />
      <HandleSearch prompt = {} />
    </div>
  );
}

export default App;
