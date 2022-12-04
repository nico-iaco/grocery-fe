import {useEffect, useState} from "react";
import {Item} from "../model/item";
import {setError} from "../action/Action";
import {getAllItems} from "../api/itemApis";
import {useDispatch} from "react-redux";

export const useItemList = (onlyAvailable: boolean, userId: string) => {
    const [itemList, setItemList] = useState<Item[]>([])
    const [isDataAvailable, setIsDataAvailable] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsDataAvailable(false);
        const controller = new AbortController();
        getAllItems(onlyAvailable, userId, controller)
            .then(value => {
                if (value) {
                    setItemList(value)
                    setIsDataAvailable(true);
                }
            })
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message));
                setIsDataAvailable(true);
            });
        return () => controller.abort();
    }, [])

    return {itemList, isDataAvailable};
}