import {useEffect, useState} from "react";
import {FoodConsumption} from "../model/foodConsumption";
import {getMealFoodConsumptions} from "../api/mealApis";
import {setError} from "../action/Action";
import {useDispatch} from "react-redux";

export const useFoodConsumptionList = (userId: string, mealId: string) => {
    const [mealFoodConsumptionList, setMealFoodConsumptionList] = useState<FoodConsumption[]>([])

    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();
        getMealFoodConsumptions(mealId,
            userId,
            controller)
            .then(mealFoodConsumptionList => setMealFoodConsumptionList(mealFoodConsumptionList || []))
            .catch(reason => {
                console.log(reason)
                dispatch(setError(reason.message));
            });
        return () => controller.abort();
    }, [mealId]);

    return mealFoodConsumptionList;
}