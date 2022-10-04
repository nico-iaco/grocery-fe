import {Grid, IconButton, Paper, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export interface FoodConsumptionRowComponentProps {
    foodName: string;
    quantityUsed: number;
    unit: string;
    kcal: number;
    onItemClicked: () => void;
    onButtonClicked: () => void;
}

export const FoodConsumptionRowComponent = (props: FoodConsumptionRowComponentProps) => {
    return <div style={{
        paddingBottom: 8
    }}>
        <Paper variant="outlined">
            <Grid container columns={10}>
                <Grid item xs={8} onClick={props.onItemClicked}>
                    <Grid container columns={8}>
                        <Grid item xs={8}>
                            <Typography variant="h5">{props.foodName}</Typography>
                        </Grid>
                        <Grid item xs={8} >
                            <Typography variant="subtitle1">{props.quantityUsed} {props.unit} § {props.kcal} kcal</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2} className="center">
                    <IconButton edge="end" aria-label="delete" onClick={props.onButtonClicked}>
                        <DeleteIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    </div>

}
