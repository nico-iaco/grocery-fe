import {useNavigate, useParams} from "react-router-dom";
import {AppBar, Box, Button, Container, Grid, IconButton, List, Toolbar, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Transaction} from "../../model/transaction";
import {getAllItemTransaction, getItemDetail} from "../../api/itemApis";
import {TransactionRowComponent} from "../../component/TransactionRowComponent";
import {Add, ArrowBack} from "@mui/icons-material";
import {FoodDetail} from "../../model/foodDetails";
import "./ItemTransactionPage.css";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentItem} from "../../selector/Selector";
import {setCurrentItem, setCurrentTransaction} from "../../action/Action";
import {Fab} from "react-tiny-fab";

export function ItemTransactionPage() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentItem = useSelector(getCurrentItem);
    const [itemTransactionList, setItemTransactionList] = useState<Transaction[]>([])
    const [itemDetails, setItemDetails] = useState<FoodDetail>();

    useEffect(() => {
        getItemDetail(currentItem?.id || "")
            .then(value => {
                setItemDetails(value || {});
            }).catch(reason => console.error(reason));
        getAllItemTransaction(currentItem?.id || "")
            .then(itemTransactionList => setItemTransactionList(itemTransactionList || []))
            .catch(reason => console.log(reason));
    }, [currentItem?.id]);

    const goToAddTransactionPage = () => {
        navigate(`/item/${currentItem?.id}/transaction/add`);
    }

    const goBack = () => {
        dispatch(setCurrentItem(undefined));
        navigate(`/item`);
    }

    const goToEditTransactionPage = (transaction: Transaction) => {
        dispatch(setCurrentTransaction(transaction));
        navigate(`/item/${itemId}/transaction/${transaction.id}/edit`);
    }

    return (
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
                                {currentItem?.name} transactions
                            </Typography>
                            <Button disabled ></Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Container className="container">
                <Grid item xs={12}>
                    <img src={itemDetails?.image_nutrition_url} className="content-image"  alt="nutrition-table"/>
                    <List>
                        {itemTransactionList.map(transaction => {
                            return <TransactionRowComponent
                                key={transaction.id}
                                id={transaction.id}
                                vendor={transaction.vendor}
                                quantity={transaction.quantity}
                                availableQuantity={transaction.availableQuantity}
                                unit={transaction.unit}
                                price={transaction.price}
                                expirationDate={transaction.expirationDate}
                                onTransactionClick={() => {}}
                                onTransactionButtonClick={() => goToEditTransactionPage(transaction)}
                            />
                        })}
                    </List>
                </Grid>
                <Fab
                    mainButtonStyles={{backgroundColor: '#1677d7'}}
                    icon={<Add/>}
                    alwaysShowTitle={true}
                    event="click"
                    onClick={goToAddTransactionPage}
                >
                </Fab>
            </Container>
        </Grid>);
}
