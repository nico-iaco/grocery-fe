import {useEffect, useState} from "react";
import {FoodDetail} from "../model/foodDetails";
import {getItemDetail} from "../api/itemApis";
import {setError} from "../action/Action";
import {useDispatch} from "react-redux";

export const useItemDetail = (foodId: string, pantryId: string) => {
    const [itemDetails, setItemDetails] = useState<FoodDetail>();

    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();
        getItemDetail(foodId, pantryId, controller)
            .then(value => {
                setItemDetails(value);
            })
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message));
            });
        return () => controller.abort();
    }, [pantryId]);

    return itemDetails;
}