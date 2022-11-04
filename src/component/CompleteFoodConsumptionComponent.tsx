import {StepperComponentProps} from "../page/addFoodConsumption/AddFoodConsumptionPage";
import {getCurrentItem, getCurrentMeal, getCurrentTransaction, getUser} from "../selector/Selector";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Button, Grid} from "@mui/material";
import {FoodConsumptionDataComponent} from "./FoodConsumptionDataComponent";
import {useNavigate} from "react-router-dom";
import {setCurrentItem, setCurrentTransaction, setError} from "../action/Action";
import {FoodConsumption} from "../model/foodConsumption";
import {addMealFoodConsumption} from "../api/mealApis";

export const CompleteFoodConsumptionComponent = (props: StepperComponentProps) => {
    const currentMeal = useSelector(getCurrentMeal);
    const currentFood = useSelector(getCurrentItem);
    const currentUser = useSelector(getUser);
    const currentTransaction = useSelector(getCurrentTransaction);
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState<number>(0);
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
            unit: currentFood?.unit || "",
            quantityUsedStd: quantityGram,
            kcal: kcals,
            cost: cost
        }
        addMealFoodConsumption(currentMeal?.id || "",
            foodConsumption,
            currentUser?.id || "")
            .then(() => {
                dispatch(setCurrentItem(undefined));
                dispatch(setCurrentTransaction(undefined));
                navigate(`/meal/${currentMeal?.id}/consumption`);
            })
            .catch((error) => {
                console.log(error);
                dispatch(setError(error.message));
            });
    }


    return <Grid item xs={8}>
        <Grid container columns={8}>
            <Grid item xs={8}>
                <FoodConsumptionDataComponent
                    foodName={currentFood ? undefined : foodName}
                    foodId={currentFood?.id || ""}
                    quantity={quantity}
                    unit={currentTransaction?.unit || ""}
                    quantityGram={quantityGram}
                    kcals={kcals}
                    cost={currentFood ? undefined : cost}
                    onFoodNameChanged={setFoodName}
                    onQuantityChanged={setQuantity}
                    onQuantityGramChanged={setQuantityGram}
                    onKcalsChanged={setKcals}
                    onCostChanged={setCost}
                />
            </Grid>
            <Grid item xs={8}>
                <Grid container columns={8}>
                    <Grid item xs={4} className="center">
                        {
                            props.isPreviousAvailable && <Button onClick={props.onPreviousClicked}>Previous</Button>
                        }
                    </Grid>
                    <Grid item xs={4} className="center">
                        {
                            props.isNextAvailable && <Button onClick={onCompleted}>Add</Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}
