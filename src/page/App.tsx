import React, { useEffect } from 'react';
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
import {Alert, BottomNavigation, BottomNavigationAction, Paper, Snackbar} from "@mui/material";
import {Fastfood, House, LocalGroceryStore, Person} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentTabIndex, getError, getUser} from "../selector/Selector";
import {clearError, setCurrentItem, setCurrentTabIndex} from "../action/Action";
import {ProfilePage} from "./profile/ProfilePage";
import {RegistrationPage} from "./register/RegistrationPage";
import {LoginPage} from "./login/LoginPage";
import {NoAuthComponent} from "../component/NoAuthComponent";
import { analytics, initializeFirebase, initializeFirebaseAnalytics } from '../utils/firebaseUtils';

function App() {
    const currentIndex = useSelector(getCurrentTabIndex);
    const error = useSelector(getError);
    const currentUser = useSelector(getUser);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        const app = initializeFirebase();
        initializeFirebaseAnalytics(app);
    }, []);

    const goToHome = () => {
        navigate("/");
    }

    const goToItemDashboard = () => {
        navigate("/item");
    }

    const goToMealDashboard = () => {
        dispatch(setCurrentItem(undefined));
        navigate("/meal");
    }

    const goToProfile = () => {
        navigate("/profile");
    }

    const handleClose = () => {
        dispatch(clearError())
    }

    return (
        <div>
            <div className="App">
                <Routes>
                    <Route path="/" element={currentUser ? <Home/> : <NoAuthComponent/>}/>
                    <Route path="/profile" element={currentUser ? <ProfilePage/> : <NoAuthComponent/>}/>
                    <Route path="/signup" element={<RegistrationPage/>}/>
                    <Route path="/signin" element={<LoginPage/>}/>
                    <Route path="/item" element={currentUser ? <ItemDashboardPage/> : <NoAuthComponent/>}/>
                    <Route path="/item/add" element={currentUser ? <AddItemPage/> : <NoAuthComponent/>}/>
                    <Route path="/item/:itemId/transaction" element={currentUser ? <ItemTransactionPage/> : <NoAuthComponent/>}/>
                    <Route path="/item/:itemId/transaction/add" element={currentUser ? <AddTransactionPage/> : <NoAuthComponent/>}/>
                    <Route path="/item/:itemId/edit" element={currentUser ? <EditItemPage/> : <NoAuthComponent/>}/>
                    <Route path="/item/:itemId/transaction/:transactionId/edit" element={currentUser ? <EditTransactionPage/> : <NoAuthComponent/>}/>
                    <Route path="/meal" element={currentUser ? <MealDashboardPage/> : <NoAuthComponent/>}/>
                    <Route path="/meal/add" element={currentUser ? <AddMealPage/> : <NoAuthComponent/>}/>
                    <Route path="/meal/:mealId/consumption" element={currentUser ? <MealFoodConsumptionPage/> : <NoAuthComponent/>}/>
                    <Route path="/meal/:mealId/consumption/add" element={currentUser ? <AddFoodConsumptionPage/> : <NoAuthComponent/>}/>
                    <Route path="/meal/:mealId/consumption/:consumptionId/edit" element={currentUser ? <EditFoodConsumptionPage/> : <NoAuthComponent/>}/>
                    <Route path="/meal/:mealId/edit" element={currentUser ? <EditMealPage/> : <NoAuthComponent/>}/>
                </Routes>
            </div>
            <Snackbar
                open={error?.isInErrorState}
                onClose={handleClose}
                autoHideDuration={2000}
                sx={{ bottom: { xs: 140, sm: 75 } }}
            >
                <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
                    {error?.message}
                </Alert>
            </Snackbar>
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
                    <BottomNavigationAction label="Profile" icon={<Person />} onClick={goToProfile} />
                </BottomNavigation>
            </Paper>
        </div>

    );
}

export default App;
