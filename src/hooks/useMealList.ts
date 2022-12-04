import {useEffect, useState} from "react";
import {Meal} from "../model/meal";
import {setError} from "../action/Action";
import {getAllMealInDateRange} from "../api/mealApis";
import {useDispatch} from "react-redux";

export const useMealList = (userId: string, startRange: Date, endRange: Date) => {
    const [mealList, setMealList] = useState<Meal[]>([])
    const [isDataAvailable, setIsDataAvailable] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsDataAvailable(false);
        const controller = new AbortController();
        getAllMealInDateRange(startRange, endRange, userId, controller)
            .then(value => {
                setMealList(value || [])
                setIsDataAvailable(true);
            })
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message))
                setIsDataAvailable(true);
            });
        return () => {
            controller.abort();
        }
    }, [startRange, endRange]);

    return {mealList, isDataAvailable};
}