import {AppBar, Box, Button, Container, Grid, IconButton, List, Toolbar, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentMeal, getUser} from "../../selector/Selector";
import {Add, ArrowBack} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {setCurrentFoodConsumption, setCurrentMeal, setError} from "../../action/Action";
import {useNavigate} from "react-router-dom";
import {FoodConsumption} from "../../model/foodConsumption";
import {getMealFoodConsumptions} from "../../api/mealApis";
import {FoodConsumptionRowComponent} from "../../component/FoodConsumptionRowComponent";
import {Fab} from "react-tiny-fab";

export const MealFoodConsumptionPage = () => {
    const currentMeal = useSelector(getCurrentMeal);
    const currentUser = useSelector(getUser);
    const [mealFoodConsumptionList, setMealFoodConsumptionList] = useState<FoodConsumption[]>([])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        getMealFoodConsumptions(currentMeal?.id || "",
            currentUser?.id || "",
            controller)
            .then(mealFoodConsumptionList => setMealFoodConsumptionList(mealFoodConsumptionList || []))
            .catch(reason => {
                console.log(reason)
                dispatch(setError(reason.message));
            });
        return () => controller.abort();
    }, [currentMeal?.id]);

    const goBack = () => {
        dispatch(setCurrentMeal(undefined));
        navigate(`/meal`);
    }

    const goToAddFoodConsumptionPage = () => {
        navigate(`/meal/${currentMeal?.id}/consumption/add`);
    }

    const goToEditFoodConsumptionPage = (foodConsumption: FoodConsumption) => {
        dispatch(setCurrentFoodConsumption(foodConsumption));
        navigate(`/meal/${currentMeal?.id}/consumption/${foodConsumption.id}/edit`);
    }

    const goToEditMealPage = () => {
        navigate(`/meal/${currentMeal?.id}/edit`);
    }

    return <Grid container columns={8}>
        <Grid item xs={8}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="back"
                            sx={{mr: 2}}
                            onClick={goBack}
                        >
                            <ArrowBack/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Meal consumption
                        </Typography>
                        <Button onClick={goToEditMealPage} color="inherit">Edit</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Grid>
        <Container className="container">
            <Grid item xs={8}>
                <List>
                    {
                        mealFoodConsumptionList.map(value =>
                            <FoodConsumptionRowComponent
                                key={value.id}
                                foodName={value.foodName}
                                quantityUsed={value.quantityUsed}
                                unit={value.unit}
                                kcal={value.kcal}
                                onItemClicked={() => {}}
                                onButtonClicked={() => goToEditFoodConsumptionPage(value)}
                            />)
                    }
                </List>
            </Grid>
            <Fab
                mainButtonStyles={{backgroundColor: '#1677d7'}}
                style={{bottom: 50, right: 12}}
                icon={<Add/>}
                alwaysShowTitle={true}
                event="click"
                onClick={goToAddFoodConsumptionPage}
            >
            </Fab>
        </Container>
    </Grid>
}
