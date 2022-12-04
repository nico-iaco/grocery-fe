import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import {Transaction} from "../../model/transaction";
import {useNavigate, useParams} from "react-router-dom";
import {addTransactionToItem} from "../../api/itemApis";
import {ArrowBack} from "@mui/icons-material";
import {TransactionDataComponent} from "../../component/TransactionDataComponent";
import {useDispatch, useSelector} from "react-redux";
import {setError} from "../../action/Action";
import {getUser} from "../../selector/Selector";


export function AddTransactionPage() {
    const {itemId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector(getUser);

    const [seller, setSeller] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [quantityStd, setQuantityStd] = useState(0)
    const [unit, setUnit] = useState("")
    const [price, setPrice] = useState(0)
    const [expirationDate, setExpirationDate] = useState(new Date())
    const [purchaseDate, setPurchaseDate] = useState(new Date())

    const goBack = () => {
        navigate(-1);
    }

    const sendTransactionToBe = () => {

        const transaction: Transaction = {
            id: "",
            seller,
            quantity,
            quantityStd,
            availableQuantity: quantity,
            unit,
            price,
            expirationDate,
            purchaseDate
        }

        const controller = new AbortController();

        addTransactionToItem(itemId || "",
            transaction,
            currentUser?.id || "",
            controller)
            .then(goBack)
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
                            Add transaction
                        </Typography>
                        <Button disabled></Button>
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
                buttonText="Add"
                onButtonClick={sendTransactionToBe}/>
        </Container>

    </Grid>
}
