import {Button, Container, Fab, Grid, IconButton, List} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentMeal, getUser} from "../../selector/Selector";
import {Add, ArrowBack} from "@mui/icons-material";
import {setCurrentFoodConsumption, setCurrentMeal} from "../../action/Action";
import {useNavigate} from "react-router-dom";
import {FoodConsumption} from "../../model/foodConsumption";
import {FoodConsumptionRowComponent} from "../../component/FoodConsumptionRowComponent";
import {useFoodConsumptionList} from "../../hooks/useFoodConsumptionList";
import {AppBarComponent} from "../../component/AppBarComponent";

const MealFoodConsumptionPage = () => {
    const currentMeal = useSelector(getCurrentMeal);
    const currentUser = useSelector(getUser);
    const mealFoodConsumptionList = useFoodConsumptionList(currentUser?.id || "", currentMeal?.id || "");
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            <AppBarComponent
                title={"Meal consumption"}
                leftButton={<IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="back"
                    sx={{mr: 2}}
                    onClick={goBack}
                >
                    <ArrowBack/>
                </IconButton>}
                rightButton={<Button onClick={goToEditMealPage} color="inherit">Edit</Button>}
            />
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
                color="secondary"
                sx={{position: 'fixed', bottom: 62, right: 8}}
                onClick={goToAddFoodConsumptionPage}
            >
                <Add/>
            </Fab>
        </Container>
    </Grid>
}

export default MealFoodConsumptionPage;
