import {AppBar, Box, Button, Container, Grid, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import React, {useState} from "react";
import {Transaction} from "../../model/transaction";
import {useNavigate, useParams} from "react-router-dom";
import {addTransactionToItem} from "../../api/itemApis";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ArrowBack} from "@mui/icons-material";


export function AddTransactionPage() {
    const { itemId, itemName } = useParams();
    const navigate = useNavigate();

    const [vendor, setVendor] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [unit, setUnit] = useState("")
    const [price, setPrice] = useState(0)
    const [expirationDate, setExpirationDate] = useState(new Date())

    const goBack = () => {
        navigate(`/item/${itemId}/${itemName}`);
    }

    const sendTransactionToBe = () => {

        const transaction: Transaction = {
            id: "",
            vendor,
            quantity,
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

    return <Container>
        <Grid container columns={8} sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>
            <Grid item xs={8}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={goBack}
                            >
                                <ArrowBack />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Add transaction
                            </Typography>
                            <Button disabled></Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    required
                    id="outlined"
                    label="Vendor"
                    value={vendor}
                    onChange={(event) => setVendor(event.target.value)}
                />
            </Grid>
            <Grid item xs={8}>
                <TextField
                    required
                    id="outlined"
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(event) => setQuantity(Number.parseFloat(event.target.value))}
                />
            </Grid>
            <Grid item xs={8}>
                <TextField
                    required
                    id="outlined"
                    label="Unit"
                    value={unit}
                    onChange={(event) => setUnit(event.target.value)}
                />
            </Grid>
            <Grid item xs={8}>
                <TextField
                    required
                    id="outlined"
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(Number.parseFloat(event.target.value))}
                />
            </Grid>
            <Grid item xs={8}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Expiration date"
                        value={expirationDate}
                        minDate={new Date()}
                        onChange={(newValue) => {
                            if (newValue !== null) {
                                setExpirationDate(new Date(newValue));
                            }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={8}>
                <Button variant="contained" onClick={() => sendTransactionToBe()}>Add Transaction</Button>
            </Grid>
        </Grid>
    </Container>
}
