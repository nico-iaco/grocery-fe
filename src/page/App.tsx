import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./home/Home";
import {AddItemPage} from "./addItem/AddItemPage";
import {ItemTransactionPage} from "./itemTransaction/ItemTransactionPage";
import {AddTransactionPage} from "./addTransaction/AddTransactionPage";
import {EditItemPage} from "./editItem/EditItemPage";
import {EditTransactionPage} from "./editTransaction/EditTransactionPage";
import {MealDashboardPage} from "./mealDashboard/MealDashboardPage";
import {ItemDashboardPage} from "./itemDashboard/ItemDashboardPage";
import {AddMealPage} from "./addMeal/AddMealPage";
import {MealFoodConsumptionPage} from "./mealFoodConsumption/MealFoodConsumptionPage";
import {EditMealPage} from "./editMeal/EditMealPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/item" element={<ItemDashboardPage/>}/>
                <Route path="/item/add" element={<AddItemPage/>}/>
                <Route path="/item/:itemId/transaction" element={<ItemTransactionPage/>}/>
                <Route path="/item/:itemId/transaction/add" element={<AddTransactionPage/>}/>
                <Route path="/item/:itemId/edit" element={<EditItemPage/>}/>
                <Route path="/item/:itemId/transaction/:transactionId/edit" element={<EditTransactionPage/>}/>
                <Route path="/meal" element={<MealDashboardPage/>}/>
                <Route path="/meal/add" element={<AddMealPage/>}/>
                <Route path="/meal/:mealId/consumption" element={<MealFoodConsumptionPage/>}/>
                <Route path="/meal/:mealId/edit" element={<EditMealPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
