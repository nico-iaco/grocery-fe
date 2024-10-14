import {useEffect, useState} from "react";
import {ItemStatistics} from "../model/itemStatistics";
import {getItemStatistics} from "../api/itemApis";
import {setError} from "../action/Action";
import {useDispatch} from "react-redux";

export const useItemStatistics = (pantryId: string) => {
    const [itemStatistics, setItemStatistics] = useState<ItemStatistics>({
        itemsAlmostFinished: null,
        itemsInExpiration: null,
    });
    const controller = new AbortController();

    const dispatch = useDispatch();

    useEffect(() => {
        getItemStatistics(pantryId, controller)
            .then(value => {
                if (value) {
                    setItemStatistics(value);
                }
            })
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message))
            });
        return () => {
            controller.abort();
        }
    }, []);

    return itemStatistics;
}