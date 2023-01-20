import {Container, Fab, Grid, IconButton, List} from "@mui/material";
import {Meal} from "../../model/meal";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {MealRowComponent} from "../../component/MealRowComponent";
import {Add, CalendarMonth} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMeal, setCurrentMealDate, setCurrentTabIndex} from "../../action/Action";
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {MealStatisticsComponent} from "../../component/MealStatisticsComponent";
import {format} from "date-fns";
import {getCurrentMealDate, getUser} from "../../selector/Selector";
import {NoDataAvailableComponent} from "../../component/NoDataAvailableComponent";
import {useMealStatistics} from "../../hooks/useMealStatistics";
import {useMealList} from "../../hooks/useMealList";
import {AppBarComponent} from "../../component/AppBarComponent";
import {ListLoadingComponent} from "../../component/ListLoadingComponent";
import {strings} from "../../localization/strings";


const MealDashboardPage = () => {

    const [date, setDate] = useState<Date>(new Date());
    const selectedDate = useSelector(getCurrentMealDate);
    const [formattedDate, setFormattedDate] = useState<string>(format(new Date(selectedDate), "dd-MM-yyyy"));
    const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
    const currentUser = useSelector(getUser);
    const {mealList, isDataAvailable} = useMealList(currentUser?.id || "", selectedDate, selectedDate);
    const mealStatistic = useMealStatistics(currentUser?.id || "", selectedDate, selectedDate)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleDateChange = (date: Date | null) => {
        if (date) {
            dispatch(setCurrentMealDate(date));
            setFormattedDate(format(new Date(date), "dd-MM-yyyy"));
        }
    }

    useEffect(() => {
        dispatch(setCurrentTabIndex(1));
    }, [])

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
                <AppBarComponent
                    title={strings.formatString(strings.mealsTitle, formattedDate).toString()}
                    rightButton={<IconButton
                        size="large"
                        color={"inherit"}
                        edge={"end"}
                        sx={{mr: 2}}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Date picker"
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
                    </IconButton>}
                />
            </Grid>
            <Container className="container">
                <Grid item xs={8}>
                    <MealStatisticsComponent
                        mealStatistics={mealStatistic}
                        mealKcalChartLabel={strings.mealStatisticsKcalPerMealTypeTitle}
                        kcalLabel={strings.mealStatisticsSumKcalPerDayLabel}
                        costLabel={strings.mealStatisticsSumCostPerDayLabel}
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
                            :   <ListLoadingComponent listItemNumber={8} />
                        }
                    </List>
                </Grid>
                <Fab
                    color="secondary"
                    className={"fab"}
                    onClick={goToAddMeal}
                >
                    <Add/>
                </Fab>
            </Container>
        </Grid>
    )

}

export default MealDashboardPage;