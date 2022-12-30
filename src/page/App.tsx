import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import {
    Alert,
    BottomNavigation,
    BottomNavigationAction,
    createTheme,
    Paper,
    Snackbar,
    ThemeProvider
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import {Fastfood, FoodBank, House, Person} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentTabIndex, getError, getUser} from "../selector/Selector";
import {clearError, setCurrentItem, setCurrentTabIndex} from "../action/Action";
import {lazy, Suspense} from "react";

const Home = lazy(() => import('./home/Home'));
const AddItemPage = lazy(() => import('./addItem/AddItemPage'));
const ItemTransactionPage = lazy(() => import('./itemTransaction/ItemTransactionPage'));
const AddTransactionPage = lazy(() => import('./addTransaction/AddTransactionPage'));
const EditItemPage = lazy(() => import('./editItem/EditItemPage'));
const EditTransactionPage = lazy(() => import('./editTransaction/EditTransactionPage'));
const MealDashboardPage = lazy(() => import('./mealDashboard/MealDashboardPage'));
const ItemDashboardPage = lazy(() => import('./itemDashboard/ItemDashboardPage'));
const AddMealPage = lazy(() => import('./addMeal/AddMealPage'));
const MealFoodConsumptionPage = lazy(() => import('./mealFoodConsumption/MealFoodConsumptionPage'));
const EditMealPage = lazy(() => import('./editMeal/EditMealPage'));
const AddFoodConsumptionPage = lazy(() => import('./addFoodConsumption/AddFoodConsumptionPage'));
const EditFoodConsumptionPage = lazy(() => import('./editFoodConsumption/EditFoodConsumptionPage'));
const ProfilePage = lazy(() => import('./profile/ProfilePage'));
const RegistrationPage = lazy(() => import('./register/RegistrationPage'));
const LoginPage = lazy(() => import('./login/LoginPage'));
const NoAuthComponent = lazy(() => import('./noAuth/NoAuthPage'));
const LiveGroceryShoppingPage = lazy(() => import('./liveGroceryShopping/LiveGroceryShoppingPage'));
const AddItemCartPage = lazy(() => import('./addCartItem/AddItemCartPage'));
const EditItemCartPage = lazy(() => import('./editCartItem/EditItemCartPage'));

function App() {
    const currentIndex = useSelector(getCurrentTabIndex);
    const error = useSelector(getError);
    const currentUser = useSelector(getUser);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    let theme = createTheme({
        palette: {
            primary: {
                main: '#F3A766',
            },
            secondary: {
                main: '#0068B7',
            },
        },
    });

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
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Suspense fallback={<CircularProgress className="center"/>}>
                        <Routes>
                            <Route path="/" element={currentUser ? <Home/> : <NoAuthComponent/>}/>
                            <Route path="/profile" element={currentUser ? <ProfilePage/> : <NoAuthComponent/>}/>
                            <Route path="/signup" element={<RegistrationPage/>}/>
                            <Route path="/signin" element={<LoginPage/>}/>
                            <Route path="/item" element={currentUser ? <ItemDashboardPage/> : <NoAuthComponent/>}/>
                            <Route path="/item/add" element={currentUser ? <AddItemPage/> : <NoAuthComponent/>}/>
                            <Route path="/item/:itemId/transaction"
                                   element={currentUser ? <ItemTransactionPage/> : <NoAuthComponent/>}/>
                            <Route path="/item/:itemId/transaction/add"
                                   element={currentUser ? <AddTransactionPage/> : <NoAuthComponent/>}/>
                            <Route path="/item/:itemId/edit"
                                   element={currentUser ? <EditItemPage/> : <NoAuthComponent/>}/>
                            <Route path="/item/:itemId/transaction/:transactionId/edit"
                                   element={currentUser ? <EditTransactionPage/> : <NoAuthComponent/>}/>
                            <Route path="/meal" element={currentUser ? <MealDashboardPage/> : <NoAuthComponent/>}/>
                            <Route path="/meal/add" element={currentUser ? <AddMealPage/> : <NoAuthComponent/>}/>
                            <Route path="/meal/:mealId/consumption"
                                   element={currentUser ? <MealFoodConsumptionPage/> : <NoAuthComponent/>}/>
                            <Route path="/meal/:mealId/consumption/add"
                                   element={currentUser ? <AddFoodConsumptionPage/> : <NoAuthComponent/>}/>
                            <Route path="/meal/:mealId/consumption/:consumptionId/edit"
                                   element={currentUser ? <EditFoodConsumptionPage/> : <NoAuthComponent/>}/>
                            <Route path="/meal/:mealId/edit"
                                   element={currentUser ? <EditMealPage/> : <NoAuthComponent/>}/>
                            <Route path="/live"
                                   element={currentUser ? <LiveGroceryShoppingPage/> : <NoAuthComponent/>}/>
                            <Route path="/live/add" element={currentUser ? <AddItemCartPage/> : <NoAuthComponent/>}/>
                            <Route path="/live/edit/:barcode"
                                   element={currentUser ? <EditItemCartPage/> : <NoAuthComponent/>}/>
                        </Routes>
                    </Suspense>

                </div>
                <Snackbar
                    open={error?.isInErrorState}
                    onClose={handleClose}
                    autoHideDuration={2000}
                    sx={{bottom: {xs: 140, sm: 75}}}
                >
                    <Alert variant="filled" severity="error" sx={{width: '100%'}}>
                        {error?.message}
                    </Alert>
                </Snackbar>
                <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, paddingBottom: '4px'}} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={currentIndex}
                        onChange={(event, newValue) => {
                            dispatch(setCurrentTabIndex(newValue));
                        }}
                    >
                        <BottomNavigationAction label="Home" icon={<House/>} onClick={goToHome}/>
                        <BottomNavigationAction label="Meal" icon={<Fastfood/>} onClick={goToMealDashboard}/>
                        <BottomNavigationAction label="Grocery" icon={<FoodBank/>} onClick={goToItemDashboard}/>
                        <BottomNavigationAction label="Profile" icon={<Person/>} onClick={goToProfile}/>
                    </BottomNavigation>
                </Paper>
            </ThemeProvider>
        </div>
    );
}

export default App;
