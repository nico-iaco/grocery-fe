import {useEffect, useState} from "react";
import {Transaction} from "../model/transaction";
import {getAllItemTransaction} from "../api/itemApis";
import {setError} from "../action/Action";
import {useDispatch} from "react-redux";

export const useTransactionList = (pantryId: string, foodId: string, onlyAvailable: boolean) => {
    const [transactionList, setTransactionList] = useState<Transaction[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();
        getAllItemTransaction(foodId || "" ,
            onlyAvailable,
            pantryId,
            controller)
            .then((transactions) => {
                setTransactionList(transactions || []);
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
    return transactionList;
}