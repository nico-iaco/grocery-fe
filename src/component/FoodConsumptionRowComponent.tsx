import {Grid, IconButton, Paper, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {SimpleItemRowComponent} from "./SimpleItemRowComponent";

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
        <Paper variant="outlined" style={{
            padding: 8
        }}>
            <Grid container columns={10}>
                <SimpleItemRowComponent
                    mainText={props.foodName}
                    subText={`${props.quantityUsed} ${props.unit} § ${props.kcal} kcal`}
                    onClick={ props.onItemClicked }
                />
                <Grid item xs={2} className="center">
                    <IconButton edge="end" aria-label="delete" onClick={props.onButtonClicked}>
                        <DeleteIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    </div>

}
