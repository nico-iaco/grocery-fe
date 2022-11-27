import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {Meal, MealType} from "../../model/meal";
import {addMeal} from "../../api/mealApis";
import {useNavigate} from "react-router-dom";
import {setCurrentMeal, setError} from "../../action/Action";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {MealDataComponent} from "../../component/MealDataComponent";
import {getUser} from "../../selector/Selector";
import {getAnalytics, logEvent} from "firebase/analytics";

export const AddMealPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mealType, setMealType] = useState(MealType.OTHERS);
    const [date, setDate] = useState(new Date());

    const user = useSelector(getUser);

    const analytics = getAnalytics();


    const sendMealToBe = () => {
        const meal: Meal = {
            name,
            userId: user?.id || "",
            description,
            mealType,
            date
        };
        const controller = new AbortController();
        addMeal(meal, controller)
            .then(value => {
                logEvent(analytics, 'add_meal', meal);
                dispatch(setCurrentMeal(value));
                navigate(`/meal/${value?.id}/consumption`);
            })
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message));
            });
    }

    const goBack = () => {
        navigate(`/meal`);
    }

    return (
            <Grid container columns={8} sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>
                <Grid item xs={8}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                    onClick={goBack}
                                >
                                    <ArrowBack />
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Add meal
                                </Typography>
                                <Button disabled></Button>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </Grid>
                <Container className="container">
                    <MealDataComponent
                        name={name}
                        onNameChange={setName}
                        description={description}
                        onDescriptionChange={setDescription}
                        mealType={mealType}
                        onMealTypeChange={setMealType}
                        date={date}
                        onDateChange={setDate}
                        buttonText="Add meal"
                        onButtonClick={sendMealToBe}
                    />
                </Container>
            </Grid>
    );

}
