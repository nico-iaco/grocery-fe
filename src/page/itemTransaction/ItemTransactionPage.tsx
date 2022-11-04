import {useNavigate} from "react-router-dom";
import {AppBar, Box, Button, Container, Grid, IconButton, List, Skeleton, Toolbar, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Transaction} from "../../model/transaction";
import {getAllItemTransaction, getItemDetail} from "../../api/itemApis";
import {TransactionRowComponent} from "../../component/TransactionRowComponent";
import {Add, ArrowBack} from "@mui/icons-material";
import {FoodDetail} from "../../model/foodDetails";
import "./ItemTransactionPage.css";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentItem, getUser} from "../../selector/Selector";
import {setCurrentItem, setCurrentTransaction, setError} from "../../action/Action";
import {Fab} from "react-tiny-fab";

export function ItemTransactionPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentItem = useSelector(getCurrentItem);
    const currentUser = useSelector(getUser);
    const [itemTransactionList, setItemTransactionList] = useState<Transaction[]>([])
    const [itemDetails, setItemDetails] = useState<FoodDetail>();

    useEffect(() => {
        getItemDetail(currentItem?.id || "", currentUser?.id || "")
            .then(value => {
                setItemDetails(value);
            })
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message));
            });
        getAllItemTransaction(currentItem?.id || "",
            false,
            currentUser?.id || "")
            .then(itemTransactionList => setItemTransactionList(itemTransactionList || []))
            .catch(reason => {
                console.log(reason)
                dispatch(setError(reason.message));
            });
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
        navigate(`/item/${currentItem?.id}/transaction/${transaction.id}/edit`);
    }

    const goToEditItemPage = () => {
        navigate(`/item/${currentItem?.id}/edit`);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="back"
                                sx={{mr: 2}}
                                onClick={goBack}
                            >
                                <ArrowBack/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                {currentItem?.name} transactions
                            </Typography>
                            <Button onClick={goToEditItemPage} color="inherit">Edit</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Container className="container">
                <Grid item xs={12}>
                    {
                        itemDetails?.image_nutrition_url ?
                            <img src={itemDetails?.image_nutrition_url} className="content-image" alt="nutrition-table" height={320}/>
                            : <Skeleton variant="rectangular" height={320}/>
                    }
                    <List className="list-container">
                        {itemTransactionList.map(transaction => {
                            return <TransactionRowComponent
                                key={transaction.id}
                                id={transaction.id}
                                seller={transaction.seller}
                                quantity={transaction.quantity}
                                availableQuantity={transaction.availableQuantity}
                                unit={transaction.unit}
                                price={transaction.price}
                                expirationDate={transaction.expirationDate}
                                onTransactionClick={() => {
                                }}
                                onTransactionButtonClick={() => goToEditTransactionPage(transaction)}
                            />
                        })}
                    </List>
                </Grid>
                <Fab
                    mainButtonStyles={{backgroundColor: '#1677d7'}}
                    style={{bottom: 50, right: 12}}
                    icon={<Add/>}
                    alwaysShowTitle={true}
                    event="click"
                    onClick={goToAddTransactionPage}
                >
                </Fab>
            </Container>
        </Grid>);
}
