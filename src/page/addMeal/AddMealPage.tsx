import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Meal, MealType} from "../../model/meal";
import {addMeal} from "../../api/mealApis";
import {useNavigate} from "react-router-dom";
import {setCurrentMeal, setError} from "../../action/Action";
import {Container, Grid} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {MealDataComponent} from "../../component/MealDataComponent";
import {getCurrentMealDate, getUser} from "../../selector/Selector";
import {getAnalytics, logEvent} from "firebase/analytics";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";

const AddMealPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentMealDate = useSelector(getCurrentMealDate);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mealType, setMealType] = useState(MealType.OTHERS);
    const [date, setDate] = useState(new Date(currentMealDate));

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
        navigate(-1);
    }

    return (
            <Grid container columns={8} sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>
                <Grid item xs={8}>
                    <AppBarComponent
                        title={strings.addMealTitle}
                        leftButton={{
                            icon: <ArrowBack/>,
                            onClick: goBack
                        }}
                    />
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
                        buttonText={strings.addButtonLabel}
                        onButtonClick={sendMealToBe}
                    />
                </Container>
            </Grid>
    );

}

export default AddMealPage;
