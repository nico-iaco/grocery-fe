import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {Meal, MealType} from "../../model/meal";
import {addMeal} from "../../api/mealApis";
import {useNavigate} from "react-router-dom";
import {setCurrentMeal} from "../../action/Action";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {MealDataComponent} from "../../component/MealDataComponent";

export const AddMealPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mealType, setMealType] = useState(MealType.OTHERS);
    const [date, setDate] = useState(new Date());

    const sendMealToBe = () => {
        const meal: Meal = {
            name,
            description,
            mealType,
            date
        };
        addMeal(meal)
            .then(value => {
                dispatch(setCurrentMeal(value));
                navigate(`/meal/${value?.id}/consumption`);
            })
            .catch(reason => console.error(reason));
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
