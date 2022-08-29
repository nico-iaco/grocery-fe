import {useNavigate, useParams} from "react-router-dom";
import {Button, Container, Grid, List, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Transaction} from "../../model/transaction";
import {deleteItemTransaction, getAllItemTransaction} from "../../api/itemApis";
import {TransactionRowComponent} from "../../component/TransactionRowComponent";

export function ItemTransaction() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [itemTransactionList, setItemTransactionList] = useState<Transaction[]>([])

    useEffect(() => {
        getAllItemTransaction(itemId || "")
            .then(itemTransactionList => setItemTransactionList(itemTransactionList || []))
            .catch(reason => console.log(reason));
    }, [itemId]);

    const goToAddTransactionPage = () => {
        navigate(`/item/${itemId}/transaction`)
    }

    const deleteTransactionFromList = (transactionId: string) => {
        deleteItemTransaction(itemId || "", transactionId)
            .then(result => {
                console.log(result);
                setItemTransactionList(itemTransactionList.filter(t => t.id !== transactionId));
            })
            .catch(reason => console.error(reason));
    }

    return (<Container>
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h3"> details</Typography>
            </Grid>
            <Grid item xs={12}>
                <List>
                    {itemTransactionList.map(transaction => {
                        return <TransactionRowComponent
                            id={transaction.id}
                            vendor={transaction.vendor}
                            quantity={transaction.quantity}
                            unit={transaction.unit}
                            price={transaction.price}
                            expirationDate={transaction.expirationDate}
                            onTransactionClick={() => deleteTransactionFromList(transaction.id)}
                        />
                    })}
                </List>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={goToAddTransactionPage}>Add transaction</Button>
            </Grid>
        </Grid>
    </Container>);
}
