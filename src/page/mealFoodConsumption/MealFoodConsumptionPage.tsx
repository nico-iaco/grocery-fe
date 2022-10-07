import {AppBar, Box, Button, Container, Grid, IconButton, List, Toolbar, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentMeal} from "../../selector/Selector";
import {ArrowBack} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {setCurrentFoodConsumption, setCurrentMeal} from "../../action/Action";
import {useNavigate} from "react-router-dom";
import {FoodConsumption} from "../../model/foodConsumption";
import {deleteMealFoodConsumption, getMealFoodConsumptions} from "../../api/mealApis";
import {FoodConsumptionRowComponent} from "../../component/FoodConsumptionRowComponent";

export const MealFoodConsumptionPage = () => {
    const currentMeal = useSelector(getCurrentMeal);
    const [mealFoodConsumptionList, setMealFoodConsumptionList] = useState<FoodConsumption[]>([])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getMealFoodConsumptions(currentMeal?.id || "")
            .then(mealFoodConsumptionList => setMealFoodConsumptionList(mealFoodConsumptionList || []))
            .catch(reason => console.log(reason));
    }, [currentMeal?.id]);

    const goBack = () => {
        dispatch(setCurrentMeal(undefined));
        navigate(`/meal`);
    }

    const goToEditItemPage = () => {
        navigate(`/meal/${currentMeal?.id}/edit`);
    }

    const goToAddFoodConsumptionPage = () => {
        navigate(`/meal/${currentMeal?.id}/consumption/add`);
    }

    const goToEditFoodConsumptionPage = (foodConsumption: FoodConsumption) => {
        dispatch(setCurrentFoodConsumption(foodConsumption));
        navigate(`/meal/${currentMeal?.id}/consumption/${foodConsumption.id}/edit`);
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
                        <Button disabled></Button>
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
            <Grid item xs={8}>
                <Button onClick={goToAddFoodConsumptionPage} variant="contained">Add food consumption</Button>
            </Grid>
        </Container>
    </Grid>
}
