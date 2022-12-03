import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    List,
    Skeleton,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import {getAllMealInDateRange, getMealStatisticsInDateRange} from "../../api/mealApis";
import {Meal} from "../../model/meal";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {MealRowComponent} from "../../component/MealRowComponent";
import {Add, CalendarMonth} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMeal, setCurrentTabIndex, setError} from "../../action/Action";
import {Fab} from "react-tiny-fab";
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {MealStatistic} from "../../model/mealStatistic";
import {MealStatisticsComponent} from "../../component/MealStatisticsComponent";
import {format} from "date-fns";
import {getUser} from "../../selector/Selector";
import {NoDataAvailableComponent} from "../../component/NoDataAvailableComponent";


export const MealDashboardPage = () => {

    const initialStatistics: MealStatistic = {
        averageWeekFoodCost: 0,
        sumWeekCost: 0,
        averageWeekCalories: 0,
        averageWeekCaloriesPerMealType: [],
    }

    const [mealList, setMealList] = useState<Meal[]>([])
    const [date, setDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [formattedDate, setFormattedDate] = useState<string>(format(new Date(), "dd-MM-yyyy"));
    const [mealStatistic, setMealStatistic] = useState<MealStatistic>(initialStatistics);
    const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
    const [isDataAvailable, setIsDataAvailable] = useState<boolean>(false);
    const currentUser = useSelector(getUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            setFormattedDate(format(new Date(date), "dd-MM-yyyy"));
        }
    }

    useEffect(() => {
        setIsDataAvailable(false);
        return () => {
            setIsDataAvailable(false);
        }
    }, [])

    useEffect(() => {
        setIsDataAvailable(false);
        dispatch(setCurrentTabIndex(1));
        const controller = new AbortController();
        getAllMealInDateRange(selectedDate, selectedDate, currentUser?.id || "", controller)
            .then(value => {
                setMealList(value || [])
                setIsDataAvailable(true);
            })
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message))
                setIsDataAvailable(true);
            });
        getMealStatisticsInDateRange(selectedDate, selectedDate, currentUser?.id || "", controller)
            .then(value => {
                setMealStatistic(value || initialStatistics)
            })
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message))
            });
        return () => {
            controller.abort();
        }
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
                                Meals of {formattedDate}
                            </Typography>
                            <IconButton
                                size="large"
                                color={"inherit"}
                                edge={"end"}
                                sx={{mr: 2}}
                            >
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
                                                handleDateChange(newValue);
                                            }
                                        }}
                                        renderInput={(params) => <CalendarMonth onClick={() => setIsPickerOpen(true)}/>}
                                    />
                                </LocalizationProvider>
                            </IconButton>

                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Container className="container">
                <Grid item xs={8}>
                    <MealStatisticsComponent
                        mealStatistics={mealStatistic}
                        mealKcalChartLabel={"Kcal per meal type"}
                        kcalLabel={"Total kcal of the day"}
                        costLabel={"Total cost of the day"}
                    />
                </Grid>
                <Grid item xs={8}>
                    <List>
                        {
                            isDataAvailable ?
                                (mealList.length > 0 ?
                                    mealList.map(meal => {
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
                                }) : <NoDataAvailableComponent/>)
                            :   <Stack spacing={1}>
                                    <Skeleton variant="rectangular" height={80}/>
                                    <Skeleton variant="rectangular" height={80}/>
                                    <Skeleton variant="rectangular" height={80}/>
                                    <Skeleton variant="rectangular" height={80}/>
                                </Stack>
                        }
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
