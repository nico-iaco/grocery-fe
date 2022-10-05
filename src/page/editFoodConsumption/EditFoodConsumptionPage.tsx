import {setCurrentFoodConsumption} from "../../action/Action";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentFoodConsumption, getCurrentMeal} from "../../selector/Selector";
import {useNavigate} from "react-router-dom";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {FoodConsumptionDataComponent} from "../../component/FoodConsumptionDataComponent";
import React from "react";
import {updateMealFoodConsumption} from "../../api/mealApis";
import {FoodConsumption} from "../../model/foodConsumption";
import {ArrowBack} from "@mui/icons-material";

export const EditFoodConsumptionPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentMeal = useSelector(getCurrentMeal);
    const currentFoodConsumption = useSelector(getCurrentFoodConsumption);

    const [quantity, setQuantity] = React.useState(currentFoodConsumption?.quantityUsed);
    const [quantityGram, setQuantityGram] = React.useState(currentFoodConsumption?.quantityUsedStd);
    const [kcals, setKcals] = React.useState(currentFoodConsumption?.kcal);

    const goBack = () => {
        dispatch(setCurrentFoodConsumption(undefined));
        navigate(`/meal/${currentMeal?.id}/consumption`);
    }

    const editFoodConsumption = () => {
        if (currentFoodConsumption) {
            const foodConsumption: FoodConsumption = {
                ...currentFoodConsumption,
                quantityUsed: quantity || 0,
                quantityUsedStd: quantityGram || 0,
                kcal: kcals || 0
            }
            updateMealFoodConsumption(currentMeal?.id || "", foodConsumption)
                .then(() => {
                    goBack();
                })
                .catch((error) => {
                    console.log(error);
                })
        }
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
                            Edit food consumption
                        </Typography>
                        <Button disabled></Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Grid>
        <Container className="container">
            <Grid item xs={8}>
                <Grid container columns={8}>
                    <Grid item xs={8}>
                        <FoodConsumptionDataComponent
                            quantity={currentFoodConsumption?.quantityUsed || 0}
                            unit={currentFoodConsumption?.unit || ""}
                            quantityGram={currentFoodConsumption?.quantityUsedStd || 0}
                            kcals={currentFoodConsumption?.kcal || 0}
                            onQuantityChanged={setQuantity}
                            onQuantityGramChanged={setQuantityGram}
                            onKcalsChanged={setKcals}/>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container columns={8}>
                            <Grid item xs={4} className="center">

                            </Grid>
                            <Grid item xs={4} className="center">
                                {
                                    <Button onClick={editFoodConsumption}>Edit</Button>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </Grid>

}
