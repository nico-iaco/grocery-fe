import {useNavigate, useParams} from "react-router-dom";
import {AppBar, Box, Button, Container, Grid, IconButton, List, Toolbar, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Transaction} from "../../model/transaction";
import {deleteItemTransaction, getAllItemTransaction, getItemDetail} from "../../api/itemApis";
import {TransactionRowComponent} from "../../component/TransactionRowComponent";
import {ArrowBack, Image} from "@mui/icons-material";
import {FoodDetail} from "../../model/foodDetails";
import "./ItemTransactionPage.css";

export function ItemTransactionPage() {
    const { itemId, itemName } = useParams();
    const navigate = useNavigate();
    const [itemTransactionList, setItemTransactionList] = useState<Transaction[]>([])
    const [itemDetails, setItemDetails] = useState<FoodDetail>();

    useEffect(() => {
        getItemDetail(itemId || "")
            .then(value => {
                setItemDetails(value || {});
            }).catch(reason => console.error(reason));
        getAllItemTransaction(itemId || "")
            .then(itemTransactionList => setItemTransactionList(itemTransactionList || []))
            .catch(reason => console.log(reason));
    }, [itemId]);

    const goToAddTransactionPage = () => {
        navigate(`/item/${itemId}/${itemName}/transaction`);
    }

    const deleteTransactionFromList = (transactionId: string) => {
        deleteItemTransaction(itemId || "", transactionId)
            .then(result => {
                console.log(result);
                setItemTransactionList(itemTransactionList.filter(t => t.id !== transactionId));
            })
            .catch(reason => console.error(reason));
    }

    const goBack = () => {
        navigate(`/`);
    }

    const goToEditItemPage = () => {
      navigate(`/item/${itemId}/${itemName}/edit`);
    }

    const goToEditTransactionPage = (transactionId: string) => {
        navigate(`/item/${itemId}/${itemName}/transaction/${transactionId}/edit`);
    }

    return (<Container>
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="back"
                                sx={{ mr: 2 }}
                                onClick={goBack}
                            >
                                <ArrowBack />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {itemName} transactions
                            </Typography>
                            <Button onClick={goToEditItemPage} color="inherit" >Edit</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <img src={itemDetails?.image_nutrition_url} className="content-image" />
                <List>
                    {itemTransactionList.map(transaction => {
                        return <TransactionRowComponent
                            id={transaction.id}
                            vendor={transaction.vendor}
                            quantity={transaction.quantity}
                            availableQuantity={transaction.availableQuantity}
                            unit={transaction.unit}
                            price={transaction.price}
                            expirationDate={transaction.expirationDate}
                            onTransactionClick={() => goToEditTransactionPage(transaction.id)}
                            onTransactionButtonClick={() => deleteTransactionFromList(transaction.id)}
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
