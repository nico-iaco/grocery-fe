import {
    FormControl,
    Grid2,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {strings} from "../localization/strings";
import dayjs from "dayjs";


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

    const availableUnit = import.meta.env.VITE_AVAILABLE_UNITS?.split(",") || [];

    return <div>
        <Grid2 size={8}>
            <TextField
                required
                id="outlined"
                label={strings.transactionSellerLabel}
                value={props.seller}
                onChange={(event) => props.onSellerChange(event.target.value)}
            />
        </Grid2>
        <Grid2 size={8}>
            <TextField
                required
                id="outlined"
                label={strings.transactionQuantityLabel}
                type="number"
                value={props.quantity}
                onChange={(event) => props.onQuantityChange(Number.parseFloat(event.target.value))}
            />
        </Grid2>
        <Grid2 size={8}>
            <TextField
                required
                select
                id="outlined"
                label={strings.transactionUnitLabel}
                value={props.unit}
                onChange={(event) => props.onUnitChange(event.target.value)}
            >
                {availableUnit.map((unit: string) => <MenuItem key={unit} value={unit}>{unit}</MenuItem>)}
            </TextField>
        </Grid2>
        {
            props.onAvailableQuantityChange ? 
                <Grid2 size={8}>
                    <TextField
                        required
                        id="outlined"
                        label={strings.transactionAvailableQuantityLabel}
                        type="number"
                        value={props.availableQuantity}
                        onChange={(event) => {
                            if (props.onAvailableQuantityChange) {
                                props.onAvailableQuantityChange(Number.parseFloat(event.target.value))
                            }
                        }}
                    />
                </Grid2>
            : null
        }
        {
            ("g" !== props.unit) && ("ml" !== props.unit) ?
                <Grid2 size={8}>
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <InputLabel htmlFor="quantity-g-required">{strings.transactionQuantityGramsLabel}</InputLabel>
                        <OutlinedInput
                            required
                            id="quantity-g-required"
                            label={strings.transactionQuantityGramsLabel}
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
                </Grid2>
                : null
        }
        <Grid2 size={8}>
            <TextField
                required
                id="outlined"
                label={strings.transactionPriceLabel}
                type="number"
                value={props.price}
                onChange={(event) => props.onPriceChange(Number.parseFloat(event.target.value))}
            />
        </Grid2>
        <Grid2 size={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={strings.transactionExpirationDateLabel}
                    value={dayjs(props.expirationDate)}
                    minDate={dayjs()}
                    format={"DD/MM/YYYY"}
                    //inputFormat="DD/MM/YYYY"
                    onChange={(newValue) => {
                        if (newValue !== null) {
                            props.onExpirationDateChange(newValue.toDate());
                        }
                    }}
                    //renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Grid2>
        <Grid2 size={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={strings.transactionPurchaseDateLabel}
                    value={dayjs(props.purchaseDate)}
                    maxDate={dayjs()}
                    format={"DD/MM/YYYY"}
                    //inputFormat="DD/MM/YYYY"
                    onChange={(newValue) => {
                        if (newValue !== null) {
                            props.onPurchaseDateChange(newValue.toDate());
                        }
                    }}
                    //renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Grid2>
    </div>
}