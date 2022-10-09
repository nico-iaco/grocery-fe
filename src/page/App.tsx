import React from 'react';
import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
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
import {AddFoodConsumptionPage} from "./addFoodConsumption/AddFoodConsumptionPage";
import {EditFoodConsumptionPage} from "./editFoodConsumption/EditFoodConsumptionPage";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import {Fastfood, House, LocalGroceryStore} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentTabIndex} from "../selector/Selector";
import {setCurrentTabIndex} from "../action/Action";

function App() {
    const currentIndex = useSelector(getCurrentTabIndex);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const goToHome = () => {
        navigate("/");
    }

    const goToItemDashboard = () => {
        navigate("/item");
    }

    const goToMealDashboard = () => {
        navigate("/meal");
    }

    return (
        <div>
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
                    <Route path="/meal/:mealId/consumption/add" element={<AddFoodConsumptionPage/>}/>
                    <Route path="/meal/:mealId/consumption/:consumptionId/edit" element={<EditFoodConsumptionPage/>}/>
                    <Route path="/meal/:mealId/edit" element={<EditMealPage/>}/>
                </Routes>
            </div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={currentIndex}
                    onChange={(event, newValue) => {
                        dispatch(setCurrentTabIndex(newValue));
                    }}
                >
                    <BottomNavigationAction label="Home" icon={<House />} onClick={goToHome} />
                    <BottomNavigationAction label="Meal" icon={<Fastfood />} onClick={goToMealDashboard} />
                    <BottomNavigationAction label="Grocery" icon={<LocalGroceryStore />} onClick={goToItemDashboard} />
                </BottomNavigation>
            </Paper>
        </div>

    );
}

export default App;
