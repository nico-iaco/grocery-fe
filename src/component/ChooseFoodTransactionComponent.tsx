import {Button, Grid2, List, Paper} from "@mui/material";
import {setCurrentItem, setCurrentTransaction, setError} from "../action/Action";
import {SimpleItemRowComponent} from "./SimpleItemRowComponent";
import {useDispatch, useSelector} from "react-redux";
import {StepperComponentProps} from "../page/addFoodConsumption/AddFoodConsumptionPage";
import {getCurrentItem, getCurrentPantry, getCurrentTransaction} from "../selector/Selector";
import {Transaction} from "../model/transaction";
import {format} from "date-fns";
import {useTransactionList} from "../hooks/useTransactionList";
import {ListLoadingComponent} from "./ListLoadingComponent";
import {strings} from "../localization/strings";

const ChooseFoodTransactionComponent = (props: StepperComponentProps) => {
    const dispatch = useDispatch();
    const currentFood = useSelector(getCurrentItem);
    const currentPantry = useSelector(getCurrentPantry);
    const currentTransaction = useSelector(getCurrentTransaction);
    const transactionList = useTransactionList(currentPantry?.id || "", currentFood?.id || "", true);



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

    return <Grid2 size={8}>
        <Grid2 container columns={8}>
            <Grid2 size={8}>
                {
                    transactionList.length > 0 ?
                        <List>
                            {transactionList.map((transaction) => {
                                const formattedDate = format(new Date(transaction.expirationDate), "dd-MM-yyyy");
                                return <div key={transaction.id} style={{padding: 8}}>
                                    <Paper variant="outlined" className={currentTransaction !== undefined && transaction.id === currentTransaction.id ? "list-item-selected" : "list-item"}>
                                        <SimpleItemRowComponent mainText={`${transaction.availableQuantity} ${transaction.unit}`} subText={formattedDate} onClick={() => {onTransactionClicked(transaction)}}/>
                                    </Paper>
                                </div>
                            })}
                        </List> : <ListLoadingComponent listItemNumber={8} />
                }
            </Grid2>
            <Grid2 size={8}>
                <Grid2 container columns={8}>
                    <Grid2 size={4} className="center">
                        {
                            props.isPreviousAvailable && <Button color={"secondary"} onClick={props.onPreviousClicked}>{strings.previousButtonLabel}</Button>
                        }
                    </Grid2>
                    <Grid2 size={4} className="center">
                        {
                            props.isSkipAvailable && <Button color={"secondary"} onClick={skip}>{strings.skipButtonLabel}</Button>
                        }
                        {
                            props.isNextAvailable && <Button color={"secondary"} onClick={next}>{strings.nextButtonLabel}</Button>
                        }
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>
    </Grid2>
}

export default ChooseFoodTransactionComponent;