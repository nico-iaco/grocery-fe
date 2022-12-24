import {setCurrentFoodConsumption, setError} from "../../action/Action";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentFoodConsumption, getCurrentMeal, getUser} from "../../selector/Selector";
import {useNavigate} from "react-router-dom";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {FoodConsumptionDataComponent} from "../../component/FoodConsumptionDataComponent";
import {deleteMealFoodConsumption, updateMealFoodConsumption} from "../../api/mealApis";
import {FoodConsumption} from "../../model/foodConsumption";
import {ArrowBack} from "@mui/icons-material";
import {useState} from "react";

const EditFoodConsumptionPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentMeal = useSelector(getCurrentMeal);
    const currentFoodConsumption = useSelector(getCurrentFoodConsumption);
    const currentUser = useSelector(getUser);

    const [foodName, setFoodName] = useState( currentFoodConsumption?.foodName || "");
    const [quantity, setQuantity] = useState<number>(currentFoodConsumption?.quantityUsed || 0);
    const [quantityGram, setQuantityGram] = useState<number>(currentFoodConsumption?.quantityUsedStd || 0);
    const [kcals, setKcals] = useState<number>(currentFoodConsumption?.kcal || 0);
    const [cost, setCost] = useState<number>(currentFoodConsumption?.cost || 0);

    const goBack = () => {
        dispatch(setCurrentFoodConsumption(undefined));
        navigate(-1);
    }

    const editFoodConsumption = () => {
        if (currentFoodConsumption) {
            const foodConsumption: FoodConsumption = {
                ...currentFoodConsumption,
                foodName: foodName,
                quantityUsed: quantity || 0,
                quantityUsedStd: quantityGram || 0,
                kcal: kcals || 0,
                cost: cost
            }
            const controller = new AbortController();
            updateMealFoodConsumption(currentMeal?.id || "",
                foodConsumption,
                currentUser?.id || "",
                controller)
                .then(goBack)
                .catch((error) => {
                    console.log(error);
                    dispatch(setError(error.message));
                })
        }
    }

    const deleteFoodConsumptionFromServer = () => {
        const controller = new AbortController();
        deleteMealFoodConsumption(currentMeal?.id || "",
            currentFoodConsumption?.id || "",
            currentUser?.id || "",
            controller)
            .then(goBack)
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message));
            });
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
                        <Button onClick={deleteFoodConsumptionFromServer} color="inherit">Delete</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Grid>
        <Container className="container">
            <Grid item xs={8}>
                <Grid container columns={8}>
                    <Grid item xs={8}>
                        <FoodConsumptionDataComponent
                            foodName={currentFoodConsumption?.foodId !== "00000000-0000-0000-0000-000000000000" ? undefined : foodName}
                            foodId={currentFoodConsumption?.foodId || ""}
                            quantity={quantity || 0}
                            unit={currentFoodConsumption?.unit || ""}
                            quantityGram={quantityGram || 0}
                            kcals={kcals || 0}
                            cost={currentFoodConsumption?.foodId !== "00000000-0000-0000-0000-000000000000" ? undefined : cost}
                            onFoodNameChanged={setFoodName}
                            onQuantityChanged={setQuantity}
                            onQuantityGramChanged={setQuantityGram}
                            onKcalsChanged={setKcals}
                            onCostChanged={setCost}
                        />
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

export default EditFoodConsumptionPage;