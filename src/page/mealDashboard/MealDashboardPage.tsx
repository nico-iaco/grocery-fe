import {Container, Fab, Grid2, IconButton, List} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {Meal} from "../../model/meal";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {MealRowComponent} from "../../component/MealRowComponent";
import {Add} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMeal, setCurrentMealDate, setCurrentTabIndex} from "../../action/Action";
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {MealStatisticsComponent} from "../../component/MealStatisticsComponent";
import {format} from "date-fns";
import {getCurrentMealDate} from "../../selector/Selector";
import {NoDataAvailableComponent} from "../../component/NoDataAvailableComponent";
import {useMealStatistics} from "../../hooks/useMealStatistics";
import {useMealList} from "../../hooks/useMealList";
import {AppBarComponent} from "../../component/AppBarComponent";
import {ListLoadingComponent} from "../../component/ListLoadingComponent";
import {strings} from "../../localization/strings";
import dayjs, {Dayjs} from "dayjs";


const MealDashboardPage = () => {

    const [date, setDate] = useState<Dayjs>(dayjs());
    const selectedDate = useSelector(getCurrentMealDate);
    const [formattedDate, setFormattedDate] = useState<string>(format(new Date(selectedDate), "dd-MM-yyyy"));
    const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
    const {mealList, isDataAvailable} = useMealList(selectedDate, selectedDate);
    const mealStatistic = useMealStatistics(selectedDate, selectedDate)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            dispatch(setCurrentMealDate(date.toDate()));
            setFormattedDate(date.format("DD-MM-YYYY"));
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
        <Grid2 container columns={8}>
            <Grid2 size={8}>
                <AppBarComponent
                    title={strings.formatString(strings.mealsTitle, formattedDate).toString()}
                    rightButton={<IconButton
                        size="large"
                        color={"inherit"}
                        edge={"end"}
                        sx={{mr: 2}}
                    >
                        <CalendarMonthIcon onClick={() => setIsPickerOpen(true)}/>
                    </IconButton>}
                />
            </Grid2>
            <Container className="container">
                <Grid2 size={8}>
                    <MealStatisticsComponent
                        mealStatistics={mealStatistic}
                        mealKcalChartLabel={strings.mealStatisticsKcalPerMealTypeTitle}
                        kcalLabel={strings.mealStatisticsSumKcalPerDayLabel}
                        costLabel={strings.mealStatisticsSumCostPerDayLabel}
                    />
                </Grid2>
                <Grid2 size={8}>
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
                </Grid2>
                <Fab
                    color="secondary"
                    className={"fab"}
                    onClick={goToAddMeal}
                >
                    <Add/>
                </Fab>
            </Container>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    sx={{display: "none"}}
                    label="Date picker"
                    value={dayjs(date)}
                    open={isPickerOpen}
                    format={"DD-MM-YYYY"}
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
                />
            </LocalizationProvider>
        </Grid2>
    )

}

export default MealDashboardPage;