import {MealType} from "../model/meal";
import {Grid, IconButton, Paper, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {format} from "date-fns";

export interface MealRowComponentProps {
    id: string
    name: string
    description: string
    mealType: MealType
    date: Date
    onClick: () => void
    onButtonClick: () => void
}

export const MealRowComponent = (props: MealRowComponentProps) => {
    const formattedDate = format(new Date(props.date), "dd-MM-yyyy")

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
                                <Typography variant="subtitle1">{props.description}</Typography>
                            </Grid>
                            <Grid item xs={5} className="center">
                                <Typography variant="h5">{props.mealType}</Typography>
                            </Grid>
                            <Grid item xs={5} className="center">
                                <Typography variant="h5">{formattedDate}</Typography>
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
