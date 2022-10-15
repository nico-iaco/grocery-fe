import {FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography} from "@mui/material";
import React from "react";
import {Calculate, Euro} from "@mui/icons-material";
import {getFoodKcal} from "../api/itemApis";
import {useDispatch} from "react-redux";
import {setError} from "../action/Action";

export interface FoodConsumptionDataComponentProps {
    foodId?: string
    foodName?: string
    quantity: number
    unit: string
    quantityGram: number
    kcals: number
    cost?: number
    onFoodNameChanged: (foodName: string) => void
    onQuantityChanged: (quantity: number) => void
    onQuantityGramChanged: (quantityGram: number) => void
    onKcalsChanged: (kcals: number) => void
    onCostChanged: (cost: number) => void
}

export const FoodConsumptionDataComponent = (props: FoodConsumptionDataComponentProps) => {
    const dispatch = useDispatch();

    const getKcals = () => {
        const quantity = props.unit === "g" ? props.quantity : props.quantityGram;
        getFoodKcal(props.foodId || "", quantity)
            .then((response) => {
                props.onKcalsChanged(response || 0)
            })
            .catch((error) => {
                console.log(error)
                dispatch(setError(error.message));
            })
    }

    return <Grid item xs={8}>
        <Grid container columns={8}>
            {
                props.foodName !== undefined ?
                    <Grid item xs={8}>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor="food-name-required">Food name</InputLabel>
                            <OutlinedInput
                                required
                                id="food-name-required"
                                label="Food name"
                                value={props.foodName}
                                onChange={(event) => props.onFoodNameChanged(event.target.value)}
                            />
                        </FormControl>
                    </Grid> : <div/>
            }
            <Grid item xs={8}>
                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                    <InputLabel htmlFor="quantity-required">Quantity</InputLabel>
                    <OutlinedInput
                        required
                        id="quantity-required"
                        label="Quantity"
                        value={props.quantity}
                        type={"number"}
                        onChange={(event) => props.onQuantityChanged(Number.parseFloat(event.target.value))}
                        endAdornment={
                            <InputAdornment position="end">
                                <Typography>{props.unit}</Typography>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
            {
                props.unit !== 'g' ?
                    <Grid item xs={8}>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor="quantity-g-required">Quantity in grams</InputLabel>
                            <OutlinedInput
                                required
                                id="quantity-g-required"
                                label="Quantity in grams"
                                value={props.quantityGram}
                                type={"number"}
                                onChange={(event) => props.onQuantityGramChanged(Number.parseFloat(event.target.value))}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Typography>g</Typography>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid> : null
            }
            <Grid item xs={8}>
                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                    <InputLabel htmlFor="kcals-required">Kcals</InputLabel>
                    <OutlinedInput
                        required
                        id="kcals-required"
                        label="Kcals"
                        value={props.kcals}
                        type={"number"}
                        onChange={(event) => props.onKcalsChanged(Number.parseFloat(event.target.value))}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={getKcals}
                                    edge="end"
                                >
                                    <Calculate/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
            {
                props.cost !== undefined ?
                    <Grid item xs={8}>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor="cost-required">Cost</InputLabel>
                            <OutlinedInput
                                required
                                id="cost-required"
                                label="Cost"
                                value={props.cost}
                                type={"number"}
                                onChange={(event) => props.onCostChanged(Number.parseFloat(event.target.value))}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={getKcals}
                                            edge="end"
                                        >
                                            <Euro/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid> : <div/>
            }
        </Grid>
    </Grid>
}
