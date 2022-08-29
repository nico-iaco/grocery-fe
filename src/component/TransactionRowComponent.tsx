import {Grid, IconButton, Paper, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
    return <div key={props.id}>
        <Paper elevation={1} variant="outlined">
            <Grid container columns={10}>
                <Grid item xs={2}>
                    <Typography variant="body1">{props.quantity} {props.unit}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Grid container columns={10}>
                        <Grid item xs={10}>
                            <Typography variant="body1">{props.vendor} {props.price}</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body1">{props.expirationDate.toString()}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <IconButton edge="end" aria-label="delete" onClick={props.onTransactionClick}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>

    </div>;
}
