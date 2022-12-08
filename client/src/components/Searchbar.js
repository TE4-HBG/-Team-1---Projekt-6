import React, { useState } from 'react';

export function Searchbar(props) {
    const [prompt, setPrompt] = useState("");

    return (
        <form onSubmit={function (e) { e.preventDefault(); console.log("SUBMITTED"); props.onSubmit(prompt) }}>
            <input type="text" placeholder="Search..." onChange={function (e) { e.preventDefault(); setPrompt(e.target.value) }} value={prompt} />
            <input type="submit" />

        </form>
    )
}
