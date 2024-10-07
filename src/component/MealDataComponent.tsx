import {MealType} from "../model/meal";
import {Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {strings} from "../localization/strings";
import dayjs from "dayjs";

export interface MealDataComponentProps {
    name?: string
    onNameChange: (v: string) => void
    description?: string
    onDescriptionChange: (v: string) => void
    mealType?: MealType
    onMealTypeChange: (v: MealType) => void
    date?: Date
    onDateChange: (v: Date) => void
    buttonText: string
    onButtonClick: () => void
}

export const MealDataComponent = (props: MealDataComponentProps) => {
    return <Grid2 container columns={8} className={"text-center"}>
        <Grid2 size={8}>
            <TextField
                required
                id="outlined"
                label={strings.mealNameLabel}
                value={props.name}
                onChange={(event) => props.onNameChange(event.target.value)}
            />
        </Grid2>
        <Grid2 size={8}>
            <TextField
                required
                id="outlined"
                label={strings.mealDescriptionLabel}
                value={props.description}
                onChange={(event) => props.onDescriptionChange(event.target.value)}
            />
        </Grid2>
        <Grid2 size={8}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel id="meal-type-select-label">{strings.mealTypeLabel}</InputLabel>
                <Select
                    required
                    labelId="meal-type-select-label"
                    id="outlined"
                    label={strings.mealTypeLabel}
                    value={props.mealType}
                    onChange={(event) => props.onMealTypeChange(event.target.value as MealType)}
                    variant={"filled"}
                >
                    <MenuItem value={MealType.BREAKFAST}>{strings.mealTypeBreakfastLabel}</MenuItem>
                    <MenuItem value={MealType.LUNCH}>{strings.mealTypeLunchLabel}</MenuItem>
                    <MenuItem value={MealType.DINNER}>{strings.mealTypeDinnerLabel}</MenuItem>
                    <MenuItem value={MealType.OTHERS}>{strings.mealTypeOtherLabel}</MenuItem>
                </Select>
            </FormControl>

        </Grid2>
        <Grid2 size={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label={strings.mealDateLabel}
                    value={dayjs(props.date)}
                    maxDate={dayjs()}
                    //inputFormat="DD/MM/YYYY HH:mm"
                    onChange={(newValue) => {
                        if (newValue !== null) {
                            props.onDateChange(newValue.toDate());
                        }
                    }}
                    //renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
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
