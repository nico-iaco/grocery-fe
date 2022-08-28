import {useNavigate, useParams} from "react-router-dom";
import {Button, Container, Grid, List, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Transaction} from "../../model/transaction";
import {getAllItemTransaction} from "../../api/itemApis";

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

    return (<Container>
        <Grid container>
            <Grid xs={12}>
                <Typography variant="h3">Food details</Typography>
            </Grid>
            <Grid xs={12}>
                <List>
                    {itemTransactionList.map(transaction => {
                        return (<div><p>{`${transaction.id}  || ${transaction.quantity}  ||  ${transaction.expirationDate}`}</p></div>)
                    })}
                </List>
            </Grid>
            <Grid xs={12}>
                <Button variant="contained" onClick={goToAddTransactionPage}>Add transaction</Button>
            </Grid>
        </Grid>
    </Container>);
}
