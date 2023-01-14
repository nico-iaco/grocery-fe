import {FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


export interface TransactionDataDisplayComponentProps {
    seller ?: string
    onSellerChange : (v: string) => void
    quantity ?: number
    onQuantityChange : (v: number) => void
    availableQuantity ?: number
    onAvailableQuantityChange ?: (v: number) => void
    unit ?: string
    onUnitChange : (v: string) => void
    quantityGram ?: number
    onQuantityGramChange : (v: number) => void
    price ?: number
    onPriceChange : (v: number) => void
    expirationDate ?: Date
    onExpirationDateChange : (v: Date) => void
    purchaseDate ?: Date
    onPurchaseDateChange : (v: Date) => void
}

export const TransactionDataDisplayComponent = (props: TransactionDataDisplayComponentProps) => {

    const availableUnit = ["g", "ml", "Unit"];

    return <div>
        <Grid item xs={8}>
            <TextField
                required
                id="outlined"
                label="Seller"
                value={props.seller}
                onChange={(event) => props.onSellerChange(event.target.value)}
            />
        </Grid>
        <Grid item xs={8}>
            <TextField
                required
                id="outlined"
                label="Quantity"
                type="number"
                value={props.quantity}
                onChange={(event) => props.onQuantityChange(Number.parseFloat(event.target.value))}
            />
        </Grid>
        <Grid item xs={8}>
            <TextField
                required
                select
                id="outlined"
                label="Unit"
                value={props.unit}
                onChange={(event) => props.onUnitChange(event.target.value)}
            >
                {availableUnit.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
            </TextField>
        </Grid>
        {
            props.onAvailableQuantityChange ? 
                <Grid item xs={8}>
                    <TextField
                        required
                        id="outlined"
                        label="Available quantity"
                        type="number"
                        value={props.availableQuantity}
                        onChange={(event) => {
                            if (props.onAvailableQuantityChange) {
                                props.onAvailableQuantityChange(Number.parseFloat(event.target.value))
                            }
                        }}
                    />
                </Grid>
            : null
        }
        {
            ("g" !== props.unit) && ("ml" !== props.unit) ?
                <Grid item xs={8}>
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <InputLabel htmlFor="quantity-g-required">Quantity in grams</InputLabel>
                        <OutlinedInput
                            required
                            id="quantity-g-required"
                            label="Quantity in grams"
                            value={props.quantityGram}
                            type={"number"}
                            onChange={(event) => props.onQuantityGramChange(Number.parseFloat(event.target.value))}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Typography>g/ml</Typography>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                : null
        }
        <Grid item xs={8}>
            <TextField
                required
                id="outlined"
                label="Price"
                type="number"
                value={props.price}
                onChange={(event) => props.onPriceChange(Number.parseFloat(event.target.value))}
            />
        </Grid>
        <Grid item xs={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Expiration date"
                    value={props.expirationDate}
                    minDate={new Date()}
                    inputFormat="DD/MM/YYYY"
                    onChange={(newValue) => {
                        if (newValue !== null) {
                            props.onExpirationDateChange(new Date(newValue));
                        }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Grid>
        <Grid item xs={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Purchase date"
                    value={props.purchaseDate}
                    maxDate={new Date()}
                    inputFormat="DD/MM/YYYY"
                    onChange={(newValue) => {
                        if (newValue !== null) {
                            props.onPurchaseDateChange(new Date(newValue));
                        }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Grid>
    </div>
}