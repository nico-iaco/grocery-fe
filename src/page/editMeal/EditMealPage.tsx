import {useDispatch, useSelector} from "react-redux";
import {getCurrentMeal, getUser} from "../../selector/Selector";
import {Button, Container, Grid2} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {MealDataComponent} from "../../component/MealDataComponent";
import {MealType} from "../../model/meal";
import {deleteMeal, updateMeal} from "../../api/mealApis";
import {setCurrentMeal, setError} from "../../action/Action";
import {useState} from "react";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";

const EditMealPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentMeal = useSelector(getCurrentMeal);
    const currentUser = useSelector(getUser);

    const [mealName, setMealName] = useState(currentMeal?.name || "");
    const [mealDescription, setMealDescription] = useState(currentMeal?.description || "");
    const [mealType, setMealType] = useState(currentMeal?.mealType || MealType.OTHERS);
    const [mealDate, setMealDate] = useState(currentMeal?.date || new Date());

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
        <Grid2 container columns={8} sx={{
            '& .MuiTextField-root': {m: 1, width: '25ch'},
        }}>
            <Grid2 size={8}>
                <AppBarComponent
                    title={strings.editMealTitle}
                    leftButton={{
                        icon: <ArrowBack/>,
                        onClick: goBack
                    }}
                    rightButton={<Button onClick={deleteMealFromServer} color="inherit">{strings.deleteButtonLabel}</Button>}
                />
            </Grid2>
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
                    buttonText={strings.editButtonLabel}
                    onButtonClick={saveMeal}/>
            </Container>
        </Grid2>)

}

export default EditMealPage;
