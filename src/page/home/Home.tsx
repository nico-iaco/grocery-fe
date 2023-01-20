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
import {strings} from "../../localization/strings";


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
                title={strings.homeTitle}
            />
        </Grid>
        <Container className="container">
            <Grid item xs={8} className="container">
                <MealStatisticsComponent
                    mealStatistics={mealStatistics}
                    mealKcalChartLabel={strings.mealStatisticsAvgKcalPerMealTypeTitle}
                    kcalLabel={strings.mealStatisticsAvgKcalPerWeekLabel}
                    costLabel={strings.mealStatisticsAvgCostPerWeekLabel}
                />
            </Grid>
            <Grid item xs={8} className="container">
                <ItemStatisticsComponent itemStatistics={itemStatistics}/>
            </Grid>
            <SpeedDial
                className={"fab"}
                FabProps={fabProps}
                icon={<Add/>}
                ariaLabel={"Add"}
            >
                <SpeedDialAction
                    FabProps={fabProps}
                    tooltipTitle={strings.fabLiveGroceryShoppingLabel}
                    onClick={goToLiveShopping}
                    tooltipOpen
                    icon={<LocalGroceryStore/>}
                />
                <SpeedDialAction
                    FabProps={fabProps}
                    tooltipTitle={strings.fabAddMealLabel}
                    onClick={goToAddMeal}
                    tooltipOpen
                    icon={<Fastfood/>}
                />
                <SpeedDialAction
                    FabProps={fabProps}
                    tooltipTitle={strings.fabAddItemLabel}
                    onClick={goToAddFood}
                    tooltipOpen
                    icon={<FoodBank/>}
                />
            </SpeedDial>
        </Container>
    </Grid>
}

export default Home;
