import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import React, {useState} from "react";
import {Transaction} from "../../model/transaction";
import {useNavigate, useParams} from "react-router-dom";
import {addTransactionToItem} from "../../api/itemApis";
import {ArrowBack} from "@mui/icons-material";
import {TransactionDataComponent} from "../../component/TransactionDataComponent";


export function AddTransactionPage() {
    const {itemId} = useParams();
    const navigate = useNavigate();

    const [vendor, setVendor] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [unit, setUnit] = useState("")
    const [price, setPrice] = useState(0)
    const [expirationDate, setExpirationDate] = useState(new Date())

    const goBack = () => {
        navigate(`/item/${itemId}/transaction`);
    }

    const sendTransactionToBe = () => {

        const transaction: Transaction = {
            id: "",
            vendor,
            quantity,
            availableQuantity: quantity,
            unit,
            price,
            expirationDate
        }

        addTransactionToItem(itemId || "", transaction)
            .then(value => {
                console.log(value);
                goBack();
            })
            .catch(reason => console.error(reason));


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
        <Container>
            <TransactionDataComponent
                vendor={vendor}
                onVendorChange={setVendor}
                quantity={quantity}
                onQuantityChange={setQuantity}
                unit={unit}
                onUnitChange={setUnit}
                price={price}
                onPriceChange={setPrice}
                expirationDate={expirationDate}
                onExpirationDateChange={setExpirationDate}
                buttonText="Add"
                onButtonClick={sendTransactionToBe}/>
        </Container>

    </Grid>
}
