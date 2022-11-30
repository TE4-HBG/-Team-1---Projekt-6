import React, {useState} from 'react';

export function Searchbar(props) {
    const [prompt, setPrompt] = useState("");
    
    return (
        <form onSubmit={function(e) {e.preventDefault();props.updatePrompt(prompt)}}>
            <input type="text"  placeholder="Search..." onChange={function(e) {e.preventDefault();setPrompt(e.target.value)}} value={prompt}/>
            <input type="submit"/>

        </form>
    )
}
