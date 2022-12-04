import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {TransactionDataComponent} from "../../component/TransactionDataComponent";
import {useNavigate, useParams} from "react-router-dom";
import {deleteItemTransaction, updateItemTransaction} from "../../api/itemApis";
import {Transaction} from "../../model/transaction";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentTransaction, getUser} from "../../selector/Selector";
import {setCurrentTransaction, setError} from "../../action/Action";
import {useState} from "react";

export const EditTransactionPage = () => {
    const {itemId} = useParams();
    const currentTransaction = useSelector(getCurrentTransaction);
    const currentUser = useSelector(getUser);
    const dispatch = useDispatch();
    const [seller, setSeller] = useState(currentTransaction?.seller || "");
    const [quantity, setQuantity] = useState(currentTransaction?.quantity || 0);
    const [unit, setUnit] = useState(currentTransaction?.unit || "");
    const [quantityStd, setQuantityStd] = useState(currentTransaction?.quantityStd || 0);
    const [price, setPrice] = useState(currentTransaction?.price || 0);
    const [expirationDate, setExpirationDate] = useState(currentTransaction?.expirationDate || new Date());
    const [purchaseDate, setPurchaseDate] = useState(currentTransaction?.purchaseDate || new Date());
    const navigate = useNavigate();


    const goBack = () => {
        dispatch(setCurrentTransaction(undefined));
        navigate(-1);
    }

    const updateTransactionToBe = () => {
        const updatedTransaction: Transaction = {
            id: currentTransaction?.id || "",
            seller,
            quantity,
            quantityStd,
            availableQuantity: currentTransaction?.availableQuantity || 0,
            unit,
            price,
            expirationDate,
            purchaseDate
        }

        const controller = new AbortController();

        updateItemTransaction(itemId || "",
            updatedTransaction,
            currentUser?.id || "",
            controller)
            .then(value => {
                console.log(value);
                goBack();
            })
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message));
            });
    }

    const deleteCurrentTransaction = () => {
        const controller = new AbortController();
        deleteItemTransaction(itemId || "",
            currentTransaction?.id || "",
            currentUser?.id || "",
            controller)
            .then(result => {
                console.log(result);
                dispatch(setCurrentTransaction(undefined));
                navigate(`/item/${itemId}/transaction`);
            })
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message));
            });
    }

    return <Grid container columns={8} sx={{
        '& .MuiTextField-root': {m: 1, width: '25ch'},
    }}>
        <Grid item xs={8}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={goBack}
                        >
                            <ArrowBack/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Edit transaction
                        </Typography>
                        <Button onClick={deleteCurrentTransaction} color="inherit">Delete</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Grid>
        <Container className="container">
            <TransactionDataComponent
                seller={seller}
                onSellerChange={setSeller}
                quantity={quantity}
                onQuantityChange={setQuantity}
                unit={unit}
                onUnitChange={setUnit}
                quantityGram={quantityStd}
                onQuantityGramChange={setQuantityStd}
                price={price}
                onPriceChange={setPrice}
                expirationDate={expirationDate}
                onExpirationDateChange={setExpirationDate}
                purchaseDate={purchaseDate}
                onPurchaseDateChange={setPurchaseDate}
                buttonText="Update"
                onButtonClick={updateTransactionToBe}/>
        </Container>
    </Grid>
}
