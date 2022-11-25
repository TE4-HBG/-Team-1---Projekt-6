import React, {useState} from 'react';

export function Searchbar() {
    const [prompt, setPrompt] = useState();
    
    return <input type="text"  placeholder="Search..." onChange={function(e) {e.preventDefault();setPrompt(e.target.value)}} value={prompt}/> 
}