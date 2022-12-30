import {Grid, IconButton, Paper} from "@mui/material";
import {SimpleItemRowComponent} from "./SimpleItemRowComponent";
import {Edit} from "@mui/icons-material";

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
            padding: 8,
            borderRadius: 8
        }}>
            <Grid container columns={10}>
                <SimpleItemRowComponent
                    mainText={props.foodName}
                    subText={`${props.quantityUsed} ${props.unit}  ${props.kcal} kcal`}
                    onClick={ props.onItemClicked }
                />
                <Grid item xs={2} className="center">
                    <IconButton edge="end" aria-label="delete" onClick={props.onButtonClicked}>
                        <Edit/>
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    </div>

}
