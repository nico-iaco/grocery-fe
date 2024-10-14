import {Button, Grid2, TextField} from "@mui/material";
import {strings} from "../localization/strings";

export interface PantryDataComponentProps {
    name?: string
    onNameChange: (v: string) => void
    description?: string
    onDescriptionChange: (v: string) => void
    isFieldDisabled?: boolean
    buttonText: string
    onButtonClick: () => void
}

export const PantryDataComponent = (props: PantryDataComponentProps) => {
    return <Grid2 container columns={8} className={"text-center"}>
        <Grid2 size={8}>
            <TextField
                required
                id="outlined"
                label={strings.mealNameLabel}
                value={props.name}
                disabled={props.isFieldDisabled}
                onChange={(event) => props.onNameChange(event.target.value)}
            />
        </Grid2>
        <Grid2 size={8}>
            <TextField
                required
                id="outlined"
                label={strings.mealDescriptionLabel}
                value={props.description}
                disabled={props.isFieldDisabled}
                onChange={(event) => props.onDescriptionChange(event.target.value)}
            />
        </Grid2>
        <Grid2 size={8}>
            <Button
                variant="contained"
                color={"secondary"}
                onClick={props.onButtonClick}
            >
                {props.buttonText}
            </Button>
        </Grid2>
    </Grid2>

}
