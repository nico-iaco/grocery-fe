import {Button, Grid, List, Paper} from "@mui/material";
import {setCurrentItem, setCurrentTransaction, setError} from "../action/Action";
import {SimpleItemRowComponent} from "./SimpleItemRowComponent";
import {useDispatch, useSelector} from "react-redux";
import {StepperComponentProps} from "../page/addFoodConsumption/AddFoodConsumptionPage";
import {getAllItemTransaction} from "../api/itemApis";
import {getCurrentItem, getCurrentTransaction, getUser} from "../selector/Selector";
import {Transaction} from "../model/transaction";
import {useEffect, useState} from "react";
import {format} from "date-fns";

export const ChooseFoodTransactionComponent = (props: StepperComponentProps) => {
    const dispatch = useDispatch();
    const currentFood = useSelector(getCurrentItem);
    const currentUser = useSelector(getUser);
    const currentTransaction = useSelector(getCurrentTransaction);
    const [transactionList, setTransactionList] = useState<Transaction[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        getAllItemTransaction(currentFood?.id || "" ,
            true,
            currentUser?.id || "",
            controller)
            .then((transactions) => {
                setTransactionList(transactions || []);
            })
            .catch((error) => {
                console.log(error);
                dispatch(setError(error.message));
            });
        return () => {
            controller.abort();
        }
    }, []);

    const onTransactionClicked = (transaction: Transaction) => {
        dispatch(setCurrentTransaction(transaction));
    }

    const next = () => {
        if (currentTransaction !== undefined) {
            props.onNextClicked();
        } else {
            dispatch(setError("Please select a transaction"));
        }
    }

    const skip = () => {
        dispatch(setCurrentItem(undefined));
        dispatch(setCurrentTransaction(undefined));
        props.onSkipClicked();
    }

    return <Grid item xs={8}>
        <Grid container columns={8}>
            <Grid item xs={8}>
                <List>
                    {transactionList.map((transaction) => {
                        const formattedDate = format(new Date(transaction.expirationDate), "dd-MM-yyyy");
                        return <div key={transaction.id} style={{padding: 8}}>
                            <Paper variant="outlined" className={currentTransaction !== undefined && transaction.id === currentTransaction.id ? "list-item-selected" : "list-item"}>
                                <SimpleItemRowComponent mainText={`${transaction.availableQuantity} ${transaction.unit}`} subText={formattedDate} onClick={() => {onTransactionClicked(transaction)}}/>
                            </Paper>
                        </div>
                    })}
                </List>
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
                            props.isSkipAvailable && <Button onClick={skip}>Skip</Button>
                        }
                        {
                            props.isNextAvailable && <Button onClick={next}>Next</Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}
