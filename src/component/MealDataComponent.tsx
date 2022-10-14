import {MealType} from "../model/meal";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import React from "react";

export interface TransactionDataComponentProps {
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

export const MealDataComponent = (props: TransactionDataComponentProps) => {
    return <Grid container columns={8}>
        <Grid item xs={8}>
            <TextField
                required
                id="outlined"
                label="Name"
                value={props.name}
                onChange={(event) => props.onNameChange(event.target.value)}
            />
        </Grid>
        <Grid item xs={8}>
            <TextField
                required
                id="outlined"
                label="Description"
                value={props.description}
                onChange={(event) => props.onDescriptionChange(event.target.value)}
            />
        </Grid>
        <Grid item xs={8}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel id="meal-type-select-label">Meal type</InputLabel>
                <Select
                    required
                    labelId="meal-type-select-label"
                    id="outlined"
                    label="Meal Type"
                    value={props.mealType}
                    onChange={(event) => props.onMealTypeChange(event.target.value as MealType)}
                >
                    <MenuItem value={MealType.BREAKFAST}>Breakfast</MenuItem>
                    <MenuItem value={MealType.LUNCH}>Lunch</MenuItem>
                    <MenuItem value={MealType.DINNER}>Dinner</MenuItem>
                    <MenuItem value={MealType.OTHERS}>Other</MenuItem>
                </Select>
            </FormControl>

        </Grid>
        <Grid item xs={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Meal date"
                    value={props.date}
                    maxDate={new Date()}
                    inputFormat="DD/MM/YYYY"
                    onChange={(newValue) => {
                        if (newValue !== null) {
                            props.onDateChange(new Date(newValue));
                        }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Grid>
        <Grid item xs={8}>
            <Button variant="contained" onClick={props.onButtonClick}>{props.buttonText}</Button>
        </Grid>
    </Grid>

}
