import {Grid, IconButton, Paper, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {format} from "date-fns";

export interface TransactionRowComponentProps {
    id: string
    vendor: string
    quantity: number
    unit: string
    price: number
    expirationDate: Date
    onTransactionClick: () => void
}

export function TransactionRowComponent(props: TransactionRowComponentProps) {
    const formattedDate = format(new Date(props.expirationDate), "dd-MM-yyyy")
    return (
        <div key={props.id} style={{
            paddingBottom: 8
        }}>
            <Paper variant="outlined">
                <Grid container columns={10}>
                    <Grid item xs={2} className="center">
                        <Typography variant="h5">{props.quantity} {props.unit}</Typography>
                    </Grid>
                    <Grid item xs={6}>
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
                        <IconButton edge="end" aria-label="delete" onClick={props.onTransactionClick}>
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </div>);
}
