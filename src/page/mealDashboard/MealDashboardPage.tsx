import {AppBar, Box, Button, Container, Grid, IconButton, List, Toolbar, Typography} from "@mui/material";
import {deleteMeal, getAllMeals} from "../../api/mealApis";
import {Meal} from "../../model/meal";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {MealRowComponent} from "../../component/MealRowComponent";
import {ArrowBack} from "@mui/icons-material";


export const MealDashboardPage = (props: any) => {
    const [mealList, setMealList] = useState<Meal[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        getAllMeals()
            .then(value => {
                if (value) {
                    setMealList(value)
                }
            })
            .catch(reason => console.error(reason));
    }, [])

    const goToAddMeal = () => {
        navigate("/meal/add");
    }

    const goToMealTransaction = (meal: Meal) => {
        navigate(`/meal/${meal.id}/`);
    }

    const deleteMealFromList = (id: string) => {
        deleteMeal(id)
            .then(v => {
                console.log(v);
                setMealList(mealList.filter(value => value.id !== id))
            })
            .catch(reason => console.error(reason));
    }

    const goBack = () => {
        navigate("/");
    }

    return (
        <Container>
            <Grid container columns={8}>
                <Grid item xs={8}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="sticky" className="AppBar">
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
                                    Meals available
                                </Typography>
                                <Button disabled></Button>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <List>
                        {mealList.map(meal => {
                            return <MealRowComponent
                                key={meal.id}
                                id={meal.id || ""}
                                name={meal.name}
                                description={meal.description}
                                mealType={meal.mealType}
                                date={meal.date}
                                onClick={() => goToMealTransaction(meal)}
                                onButtonClick={() => deleteMealFromList(meal.id || "")}
                            />
                        })}
                    </List>
                </Grid>
                <Grid item xs={8}>
                    <Button variant="contained" onClick={goToAddMeal}>Add meal</Button>
                </Grid>
            </Grid>
        </Container>
    )

}
