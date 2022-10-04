import {MealType} from "../model/meal";
import {Chip, Grid, IconButton, Paper, Typography} from "@mui/material";
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
                                <Typography variant="subtitle1">{props.description} § {formattedDate}</Typography>
                            </Grid>
                            <Grid item xs={8} className="center">
                                <Chip label={props.mealType} color="primary" variant="filled" size="small" />
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
