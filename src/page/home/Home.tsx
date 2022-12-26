import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Container, Grid, SpeedDial, SpeedDialAction, useTheme} from "@mui/material";
import {Add, Fastfood, FoodBank, LocalGroceryStore} from "@mui/icons-material";
import {MealStatisticsComponent} from "../../component/MealStatisticsComponent";
import {ItemStatisticsComponent} from "../../component/ItemStatisticsComponent";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentTabIndex} from "../../action/Action";
import {getUser} from "../../selector/Selector";
import {useMealStatistics} from "../../hooks/useMealStatistics";
import {useItemStatistics} from "../../hooks/useItemStatistics";
import {AppBarComponent} from "../../component/AppBarComponent";


function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const currentUser = useSelector(getUser);
    const mealStatistics = useMealStatistics(currentUser?.id || "");
    const itemStatistics = useItemStatistics(currentUser?.id || "");

    const fabProps = {
        style: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText
        }
    }

    useEffect(() => {
        dispatch(setCurrentTabIndex(0));
    }, [])

    const goToAddFood = () => {
        dispatch(setCurrentTabIndex(2));
        navigate(`/item/add`);
    }

    const goToAddMeal = () => {
        dispatch(setCurrentTabIndex(1));
        navigate(`/meal/add`);
    }

    const goToLiveShopping = () => {
        navigate(`/live`);
    }


    return <Grid container columns={8}>
        <Grid item xs={8}>
            <AppBarComponent
                title={"Foody"}
            />
        </Grid>
        <Container className="container">
            <Grid item xs={8} className="container">
                <MealStatisticsComponent
                    mealStatistics={mealStatistics}
                    mealKcalChartLabel={"Average calories per meal type"}
                    kcalLabel={"Average calories per week"}
                    costLabel={"Average cost per week"}
                />
            </Grid>
            <Grid item xs={8} className="container">
                <ItemStatisticsComponent itemStatistics={itemStatistics}/>
            </Grid>
            <SpeedDial
                sx={{position: 'fixed', bottom: 62, right: 8}}
                FabProps={fabProps}
                icon={<Add/>}
                ariaLabel={"Add"}
            >
                <SpeedDialAction
                    FabProps={fabProps}
                    tooltipTitle="Live grocery shopping"
                    onClick={goToLiveShopping}
                    tooltipOpen
                    icon={<LocalGroceryStore/>}
                />
                <SpeedDialAction
                    FabProps={fabProps}
                    tooltipTitle="Add meal"
                    onClick={goToAddMeal}
                    tooltipOpen
                    icon={<Fastfood/>}
                />
                <SpeedDialAction
                    FabProps={fabProps}
                    tooltipTitle="Add food"
                    onClick={goToAddFood}
                    tooltipOpen
                    icon={<FoodBank/>}
                />
            </SpeedDial>
        </Container>
    </Grid>
}

export default Home;
