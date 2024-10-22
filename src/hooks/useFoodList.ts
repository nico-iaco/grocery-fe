import {useEffect, useState} from "react";
import {Item} from "../model/item";
import {getAllItems} from "../api/itemApis";
import {setError} from "../action/Action";
import {useDispatch} from "react-redux";


export const useFoodList = (onlyAvailable: boolean, pantryId: string) => {
    const [foodList, setFoodList] = useState<Item[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();
        getAllItems(onlyAvailable, pantryId, controller)
            .then((items) => {
                setFoodList(items || []);
            })
            .catch((error) => {
                console.log(error);
                if (error.name !== "AbortError") {
                    dispatch(setError(error.message));
                }
            });
        return () => {
            controller.abort();
        }
    }, []);
    return foodList;
}