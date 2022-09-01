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
        <div key={props.id} style={{
            paddingBottom: 8
        }}>
            <Paper variant="outlined" >
                <Grid container columns={10}>
                    <Grid item xs={8} onClick={props.onClick}>
                        <Grid container columns={8}>
                            <Grid item xs={3} >
                                <Typography variant="h5">{props.name}</Typography>
                                <Typography variant="subtitle1">{props.barcode}</Typography>
                            </Grid>
                            <Grid item xs={5} className="center">
                                <Typography variant="h5">{props.quantity} {props.unit}</Typography>
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
