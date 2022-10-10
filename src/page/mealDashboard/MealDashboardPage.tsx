import {AppBar, Box, Button, Container, Grid, List, Toolbar, Typography} from "@mui/material";
import {getAllMealInDateRange, getMealStatisticsInDateRange} from "../../api/mealApis";
import {Meal} from "../../model/meal";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {MealRowComponent} from "../../component/MealRowComponent";
import {Add, CalendarMonth} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {setCurrentMeal} from "../../action/Action";
import {Fab} from "react-tiny-fab";
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {MealStatistic} from "../../model/mealStatistic";
import {MealStatisticsComponent} from "../../component/MealStatisticsComponent";


export const MealDashboardPage = () => {
    const [mealList, setMealList] = useState<Meal[]>([])
    const [date, setDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [mealStatistic, setMealStatistic] = useState<MealStatistic>({
        averageWeekFoodCost: 0,
        sumWeekCost: 0,
        averageWeekCalories: 0,
        averageWeekCaloriesPerMealType: [],
    });
    const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /*    useEffect(() => {
            getAllMeals()
                .then(value => {
                    if (value) {
                        setMealList(value)
                    }
                })
                .catch(reason => console.error(reason));
        }, [])*/

    useEffect(() => {
        getAllMealInDateRange(selectedDate, selectedDate)
            .then(value => {

            setMealList(value || [])

            })
            .catch(reason => console.error(reason));
        getMealStatisticsInDateRange(selectedDate, selectedDate)
            .then(value => {
                if (value) {
                    setMealStatistic(value)
                }
            })
            .catch(reason => console.error(reason));
    }, [selectedDate])

    const goToAddMeal = () => {
        navigate("/meal/add");
    }

    const goToMealTransaction = (meal: Meal) => {
        dispatch(setCurrentMeal(meal))
        navigate(`/meal/${meal.id}/consumption`);
    }

    const goToEditMeal = (meal: Meal) => {
        dispatch(setCurrentMeal(meal));
        navigate(`/meal/${meal.id}/edit`);
    }


    return (
        <Grid container columns={8}>
            <Grid item xs={8}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="sticky" className="AppBar">
                        <Toolbar>
                            <Button disabled></Button>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Meals available
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                    label="Basic example"
                                    value={date}
                                    open={isPickerOpen}
                                    onOpen={() => setIsPickerOpen(true)}
                                    onClose={() => setIsPickerOpen(false)}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setDate(newValue);
                                        }
                                    }}
                                    onAccept={(newValue) => {
                                        if (newValue) {
                                            setSelectedDate(newValue);
                                        }
                                    }}
                                    renderInput={(params) => <CalendarMonth onClick={() => setIsPickerOpen(true)}/>}
                                />
                            </LocalizationProvider>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Container className="container">
                <Grid item xs={8}>
                    <MealStatisticsComponent mealStatistics={mealStatistic}/>
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
                                kcal={meal.kcal}
                                cost={meal.cost}
                                onClick={() => goToMealTransaction(meal)}
                                onButtonClick={() => goToEditMeal(meal)}
                            />
                        })}
                    </List>
                </Grid>
                <Fab
                    mainButtonStyles={{backgroundColor: '#1677d7'}}
                    style={{bottom: 50, right: 12}}
                    icon={<Add/>}
                    alwaysShowTitle={true}
                    event="click"
                    onClick={goToAddMeal}
                >
                </Fab>
            </Container>
        </Grid>
    )

}
