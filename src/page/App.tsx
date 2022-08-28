import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./home/Home";
import {AddItem} from "./addItem/AddItem";
import {ItemTransaction} from "./itemTransaction/ItemTransaction";
import {AddTransactionPage} from "./addTransaction/AddTransactionPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/item" element={<AddItem />} />
                <Route path="/item/:itemId" element={<ItemTransaction />} />
                <Route path="/item/:itemId/transaction" element={<AddTransactionPage />} />
            </Routes>
        </div>
    );
}

export default App;
