import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./home/Home";
import {AddItemPage} from "./addItem/AddItemPage";
import {ItemTransactionPage} from "./itemTransaction/ItemTransactionPage";
import {AddTransactionPage} from "./addTransaction/AddTransactionPage";
import {EditItemPage} from "./editItem/EditItemPage";
import {EditTransactionPage} from "./editTransaction/EditTransactionPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/item" element={<AddItemPage/>}/>
                <Route path="/item/:itemId/:itemName" element={<ItemTransactionPage/>}/>
                <Route path="/item/:itemId/:itemName/transaction" element={<AddTransactionPage/>}/>
                <Route path="/item/:itemId/:itemName/edit" element={<EditItemPage/>}/>
                <Route path="/item/:itemId/:itemName/transaction/:transactionId/edit" element={<EditTransactionPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
