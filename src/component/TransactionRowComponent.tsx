import {Grid, IconButton, Paper, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {format} from "date-fns";

export interface TransactionRowComponentProps {
    id: string
    vendor: string
    quantity: number
    availableQuantity: number
    unit: string
    price: number
    expirationDate: Date
    onTransactionClick: () => void
    onTransactionButtonClick: () => void
}

export function TransactionRowComponent(props: TransactionRowComponentProps) {
    const formattedDate = format(new Date(props.expirationDate), "dd-MM-yyyy")
    return (
        <div style={{
            paddingBottom: 8
        }}>
            <Paper variant="outlined" style={{
                padding: 8
            }}>
                <Grid container columns={10}>
                    <Grid item xs={2} className="center" onClick={props.onTransactionClick}>
                        <Typography variant="subtitle1">{props.availableQuantity}/{props.quantity} {props.unit}</Typography>
                    </Grid>
                    <Grid item xs={6} onClick={props.onTransactionClick}>
                        <Grid container columns={10}>
                            <Grid item xs={10}>
                                <Typography variant="h5">{props.vendor} {props.price}€</Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subtitle1">Expiration date: {formattedDate}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2} className="center">
                        <IconButton edge="end" aria-label="delete" onClick={props.onTransactionButtonClick}>
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </div>);
}
