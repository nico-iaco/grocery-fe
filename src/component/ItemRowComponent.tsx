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
        <div style={{
            paddingBottom: 8
        }}>
            <Paper variant="outlined" style={{
                padding: 8
            }}>
                <Grid container columns={10}>
                    <Grid item xs={8} onClick={props.onClick}>
                        <Grid container columns={8}>
                            <Grid item xs={8} >
                                <Typography variant="h5">{props.name}</Typography>
                            </Grid>
                            <Grid item xs={8} className="center">
                                <Typography variant="subtitle1">{props.barcode} § {props.quantity} {props.unit}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2} className="center">
                        <IconButton edge="end" aria-label="delete" onClick={props.onButtonClick}>
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>

        </div>

    );
}
