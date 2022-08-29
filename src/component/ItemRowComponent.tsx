import {Grid, IconButton, Paper, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export interface ItemRowComponentProps {
    id: string
    name: string
    barcode: string,
    quantity: number
    unit: string
    onClick: () => void
    onButtonClick: () => void
}

export function ItemRowComponent(props: ItemRowComponentProps) {
    return (
        <div key={props.id}>
            <Paper elevation={1} variant="outlined">
                <Grid container columns={10}>
                    <Grid item xs={8} onClick={props.onClick}>
                        <Grid container columns={10}>
                            <Grid item xs={10}>
                                <Typography variant="h3">{props.name}</Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="h3">{props.quantity}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton edge="end" aria-label="delete" onClick={props.onButtonClick}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>

        </div>

    );
}
