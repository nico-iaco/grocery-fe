import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setError} from "../action/Action";
import {Pantry} from "../model/pantry";
import {getAllPantries} from "../api/pantryApis";

export const usePantryList = () => {
    const [pantryList, setPantryList] = useState<Pantry[]>([])

    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();
        getAllPantries(controller)
            .then(pantryList => setPantryList(pantryList || []))
            .catch(reason => {
                console.log(reason)
                dispatch(setError(reason.message));
            });
        return () => controller.abort();
    }, []);

    return pantryList;
}