import {StepperComponentProps} from "../page/addFoodConsumption/AddFoodConsumptionPage";
import {getCurrentItem, getCurrentMeal, getCurrentTransaction, getUser} from "../selector/Selector";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Button, Grid2} from "@mui/material";
import {FoodConsumptionDataComponent} from "./FoodConsumptionDataComponent";
import {useNavigate} from "react-router-dom";
import {setCurrentItem, setCurrentTransaction, setError} from "../action/Action";
import {FoodConsumption} from "../model/foodConsumption";
import {addMealFoodConsumption} from "../api/mealApis";
import {logEvent} from "firebase/analytics";
import {analytics} from "../utils/firebaseUtils";
import {strings} from "../localization/strings";

const CompleteFoodConsumptionComponent = (props: StepperComponentProps) => {
    const currentMeal = useSelector(getCurrentMeal);
    const currentFood = useSelector(getCurrentItem);
    const currentUser = useSelector(getUser);
    const currentTransaction = useSelector(getCurrentTransaction);
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState<number>(0);
    const [unit, setUnit] = useState("");
    const [quantityGram, setQuantityGram] = useState<number>(0);
    const [kcals, setKcals] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();



    const onCompleted = () => {
        const foodConsumption: FoodConsumption = {
            foodId: currentFood?.id ,
            transactionId: currentTransaction?.id,
            mealId: currentMeal?.id || "",
            foodName: currentFood?.name || foodName,
            quantityUsed: quantity,
            unit: currentFood?.unit || unit,
            quantityUsedStd: quantityGram,
            kcal: kcals,
            cost: cost
        }
        const controller = new AbortController();
        addMealFoodConsumption(currentMeal?.id || "",
            foodConsumption,
            currentUser?.id || "",
            controller)
            .then(() => {
                logEvent(analytics, 'add_food_consumption', foodConsumption);
                dispatch(setCurrentItem(undefined));
                dispatch(setCurrentTransaction(undefined));
                navigate(`/meal/${currentMeal?.id}/consumption`);
            })
            .catch((error) => {
                console.log(error);
                dispatch(setError(error.message));
            });
    }


    return <Grid2 size={8}>
        <Grid2 container columns={8}>
            <Grid2 size={8}>
                <FoodConsumptionDataComponent
                    foodName={currentFood ? undefined : foodName}
                    foodId={currentFood?.id || ""}
                    quantity={quantity}
                    unit={currentTransaction ? currentTransaction.unit : unit}
                    quantityGram={quantityGram}
                    kcals={kcals}
                    cost={currentFood ? undefined : cost}
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
                        {
                            props.isPreviousAvailable && <Button color={"secondary"} onClick={props.onPreviousClicked}>{strings.previousButtonLabel}</Button>
                        }
                    </Grid2>
                    <Grid2 size={4} className="center">
                        {
                            props.isNextAvailable && <Button color={"secondary"} onClick={onCompleted}>{strings.doneButtonLabel}</Button>
                        }
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>
    </Grid2>
}

export default CompleteFoodConsumptionComponent;
