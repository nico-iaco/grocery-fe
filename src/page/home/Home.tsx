import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AppBar, Box, Button, Container, Grid, Toolbar, Typography} from "@mui/material";
import {Action, Fab} from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import {Add, Fastfood, LocalGroceryStore} from "@mui/icons-material";
import {MealStatisticsComponent} from "../../component/MealStatisticsComponent";
import {ItemStatisticsComponent} from "../../component/ItemStatisticsComponent";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentTabIndex} from "../../action/Action";
import {getUser} from "../../selector/Selector";
import {useMealStatistics} from "../../hooks/useMealStatistics";
import {useItemStatistics} from "../../hooks/useItemStatistics";


export function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(getUser);
    const mealStatistics = useMealStatistics(currentUser?.id || "");
    const itemStatistics = useItemStatistics(currentUser?.id || "");

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


    return <Grid container columns={8}>
        <Grid item xs={8}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="sticky" className="AppBar">
                    <Toolbar>
                        <Button disabled></Button>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Home
                        </Typography>
                        <Button disabled></Button>
                    </Toolbar>
                </AppBar>
            </Box>
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
            <Fab
                mainButtonStyles={{backgroundColor: '#1677d7'}}
                style={{bottom: 50, right: 12}}
                icon={<Add/>}
                alwaysShowTitle={true}
            >
                <Action
                    style={{backgroundColor: '#1677d7'}}
                    text="Add meal"
                    onClick={goToAddMeal}
                >
                    <Fastfood/>
                </Action>
                <Action
                    style={{backgroundColor: '#1677d7'}}
                    text="Add food"
                    onClick={goToAddFood}
                >
                    <LocalGroceryStore/>
                </Action>
            </Fab>
        </Container>
    </Grid>
}
