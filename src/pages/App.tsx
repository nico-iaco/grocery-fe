import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./home/Home";
import {AddItem} from "./addItem/AddItem";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/item" element={<AddItem />} />
            </Routes>
        </div>
    );
}

export default App;
