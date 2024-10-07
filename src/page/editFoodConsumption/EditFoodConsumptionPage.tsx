import {setCurrentFoodConsumption, setError} from "../../action/Action";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentFoodConsumption, getCurrentMeal, getUser} from "../../selector/Selector";
import {useNavigate} from "react-router-dom";
import {Button, Container, Grid2} from "@mui/material";
import {FoodConsumptionDataComponent} from "../../component/FoodConsumptionDataComponent";
import {deleteMealFoodConsumption, updateMealFoodConsumption} from "../../api/mealApis";
import {FoodConsumption} from "../../model/foodConsumption";
import {ArrowBack} from "@mui/icons-material";
import {useState} from "react";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";

const EditFoodConsumptionPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentMeal = useSelector(getCurrentMeal);
    const currentFoodConsumption = useSelector(getCurrentFoodConsumption);
    const currentUser = useSelector(getUser);

    const [foodName, setFoodName] = useState( currentFoodConsumption?.foodName || "");
    const [quantity, setQuantity] = useState<number>(currentFoodConsumption?.quantityUsed || 0);
    const [unit, setUnit] = useState(currentFoodConsumption?.unit || "");
    const [quantityGram, setQuantityGram] = useState<number>(currentFoodConsumption?.quantityUsedStd || 0);
    const [kcals, setKcals] = useState<number>(currentFoodConsumption?.kcal || 0);
    const [cost, setCost] = useState<number>(currentFoodConsumption?.cost || 0);

    const goBack = () => {
        dispatch(setCurrentFoodConsumption(undefined));
        navigate(-1);
    }

    const editFoodConsumption = () => {
        if (currentFoodConsumption) {
            const foodConsumption: FoodConsumption = {
                ...currentFoodConsumption,
                foodName: foodName,
                quantityUsed: quantity,
                unit: unit,
                quantityUsedStd: quantityGram,
                kcal: kcals,
                cost: cost
            }
            const controller = new AbortController();
            updateMealFoodConsumption(currentMeal?.id || "",
                foodConsumption,
                currentUser?.id || "",
                controller)
                .then(goBack)
                .catch((error) => {
                    console.log(error);
                    dispatch(setError(error.message));
                })
        }
    }

    const deleteFoodConsumptionFromServer = () => {
        const controller = new AbortController();
        deleteMealFoodConsumption(currentMeal?.id || "",
            currentFoodConsumption?.id || "",
            currentUser?.id || "",
            controller)
            .then(goBack)
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message));
            });
    }


    return <Grid2 container columns={8}>
        <Grid2 size={8}>
            <AppBarComponent
                title={strings.editFoodConsumptionTitle}
                leftButton={{
                    icon: <ArrowBack/>,
                    onClick: goBack
                }}
                rightButton={<Button onClick={deleteFoodConsumptionFromServer} color="inherit">Delete</Button>}
            />
        </Grid2>
        <Container className="container">
            <Grid2 size={8}>
                <Grid2 container columns={8}>
                    <Grid2 size={8}>
                        <FoodConsumptionDataComponent
                            foodName={currentFoodConsumption?.foodId !== "00000000-0000-0000-0000-000000000000" ? undefined : foodName}
                            foodId={currentFoodConsumption?.foodId || ""}
                            quantity={quantity}
                            unit={unit}
                            quantityGram={quantityGram}
                            kcals={kcals}
                            cost={currentFoodConsumption?.foodId !== "00000000-0000-0000-0000-000000000000" ? undefined : cost}
                            onFoodNameChanged={setFoodName}
                            onQuantityChanged={setQuantity}
                            onUnitChanged={setUnit}
                            onQuantityGramChanged={setQuantityGram}
                            onKcalsChanged={setKcals}
                            onCostChanged={setCost}
                        />
                    </Grid2>
                    <Grid2 size={8}>
                        <Grid2 container columns={8}>
                            <Grid2 size={4} className="center">

                            </Grid2>
                            <Grid2 size={4} className="center">
                                {
                                    <Button
                                        color={"secondary"}
                                        onClick={editFoodConsumption}
                                    >
                                        {strings.editButtonLabel}
                                    </Button>
                                }
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Container>
    </Grid2>

}

export default EditFoodConsumptionPage;