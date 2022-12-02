import {useDispatch, useSelector} from "react-redux";
import {getCurrentMeal, getUser} from "../../selector/Selector";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {MealDataComponent} from "../../component/MealDataComponent";
import {MealType} from "../../model/meal";
import {deleteMeal, updateMeal} from "../../api/mealApis";
import {setCurrentMeal, setError} from "../../action/Action";

export const EditMealPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentMeal = useSelector(getCurrentMeal);
    const currentUser = useSelector(getUser);

    const [mealName, setMealName] = React.useState(currentMeal?.name || "");
    const [mealDescription, setMealDescription] = React.useState(currentMeal?.description || "");
    const [mealType, setMealType] = React.useState(currentMeal?.mealType || MealType.OTHERS);
    const [mealDate, setMealDate] = React.useState(currentMeal?.date || new Date());

    const goBack = () => {
        navigate(-1);
    }

    const saveMeal = () => {
        if (currentMeal) {
            const controller = new AbortController();
            updateMeal({
                    ...currentMeal,
                    name: mealName,
                    description: mealDescription,
                    mealType,
                    date: mealDate
                },
                currentUser?.id || "",
                controller)
                .then(goBack)
                .catch(reason => {
                    console.log(reason)
                    dispatch(setError(reason.message));
                });
        }
    }

    const deleteMealFromServer = () => {
        if (currentMeal) {
            const controller = new AbortController();
            deleteMeal(currentMeal.id || "",
                currentUser?.id || "",
                controller)
                .then(() => {
                    dispatch(setCurrentMeal(undefined));
                    navigate("/meal")
                })
                .catch(reason => {
                    console.error(reason)
                    dispatch(setError(reason.message));
                });
        }
    }


    return (
        <Grid container columns={8} sx={{
            '& .MuiTextField-root': {m: 1, width: '25ch'},
        }}>
            <Grid item xs={8}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                                onClick={goBack}
                            >
                                <ArrowBack/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Edit meal
                            </Typography>
                            <Button onClick={deleteMealFromServer} color="inherit">Delete</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Container className="container">
                <MealDataComponent
                    name={mealName}
                    onNameChange={setMealName}
                    description={mealDescription}
                    onDescriptionChange={setMealDescription}
                    mealType={mealType}
                    onMealTypeChange={setMealType}
                    date={mealDate}
                    onDateChange={setMealDate}
                    buttonText="Update"
                    onButtonClick={saveMeal}/>
            </Container>
        </Grid>)

}
