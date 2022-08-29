import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {Transaction} from "../../model/transaction";
import {useNavigate, useParams} from "react-router-dom";
import {addTransactionToItem} from "../../api/itemApis";

export function AddTransactionPage() {
    const { itemId } = useParams();
    const navigate = useNavigate();

    const [vendor, setVendor] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [unit, setUnit] = useState("")
    const [price, setPrice] = useState(0)
    const [expirationDate, setExpirationDate] = useState(new Date())

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
                navigate(`/item/${itemId}`)
            })
            .catch(reason => console.error(reason));


    }

    return <Container>
        <Grid container columns={8} sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>
            <Grid item xs={8}>
                <Typography variant="h2">Add Transaction</Typography>
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
                <TextField
                    required
                    id="outlined"
                    label="Expiration date"
                    value={expirationDate}
                    onChange={(event) => setExpirationDate(new Date(event.target.value))}
                />
            </Grid>
            <Grid item xs={8}>
                <Button variant="contained" onClick={() => sendTransactionToBe()}>Add Transaction</Button>
            </Grid>
        </Grid>
    </Container>
}
