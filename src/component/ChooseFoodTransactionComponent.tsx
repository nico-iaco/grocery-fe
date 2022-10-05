import {Button, Grid, List, Paper} from "@mui/material";
import {setCurrentTransaction} from "../action/Action";
import {SimpleItemRowComponent} from "./SimpleItemRowComponent";
import {useDispatch, useSelector} from "react-redux";
import {StepperComponentProps} from "../page/addFoodConsumption/AddFoodConsumptionPage";
import {getAllItemTransaction} from "../api/itemApis";
import {getCurrentItem, getCurrentTransaction} from "../selector/Selector";
import {Transaction} from "../model/transaction";
import {useEffect, useState} from "react";
import {format} from "date-fns";

export const ChooseFoodTransactionComponent = (props: StepperComponentProps) => {
    const dispatch = useDispatch();
    const currentFood = useSelector(getCurrentItem);
    const currentTransaction = useSelector(getCurrentTransaction);
    const [transactionList, setTransactionList] = useState<Transaction[]>([]);

    useEffect(() => {
        getAllItemTransaction(currentFood?.id || "" , true)
            .then((transactions) => {
                setTransactionList(transactions || []);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onTransactionClicked = (transaction: Transaction) => {
        dispatch(setCurrentTransaction(transaction));
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
                            props.isNextAvailable && <Button onClick={props.onNextClicked}>Next</Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}
