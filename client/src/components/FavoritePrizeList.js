import React, { useState, useEffect } from "react"; 
import Laureate from "./Laureate";
import { Modal } from 'react-bootstrap';
import server from "../server.js"
import globals from "../globals";
import {Button} from "react-bootstrap";


export default function FavoritePrizeList() { 
    const [favorites, setFavorites] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [laureates, setLaureates] = useState([])
    useEffect(
     function() {
        server.getFavorites((theShfut) => setFavorites(theShfut.favoriteLaureates))
     }, []   
    )
    useEffect(
        function() {
            if(favorites) {
                favorites.forEach(id => {
                    server.getLaureate(laureate => setLaureates(old => [...old, laureate]), id);
                });
            }
        }, [favorites]
    )

    return (
        <div>
            <Button className="button" onClick={() => setModalVisible(true)}>Favorites</Button>
            <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                <div style = {{overflowY: 'scroll', height: '500px'}}>
                    <ul>
                        {laureates.map(data => (
                            <li><Laureate data={data} /></li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </div>
    );
}   