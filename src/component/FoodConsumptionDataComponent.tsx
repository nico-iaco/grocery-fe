import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import {Calculate, Euro} from "@mui/icons-material";
import {getFoodKcal} from "../api/itemApis";
import {useDispatch, useSelector} from "react-redux";
import {setError} from "../action/Action";
import {getUser} from "../selector/Selector";
import {strings} from "../localization/strings";

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
    onUnitChanged?: (unit: string) => void
    onKcalsChanged: (kcals: number) => void
    onCostChanged: (cost: number) => void
}

export const FoodConsumptionDataComponent = (props: FoodConsumptionDataComponentProps) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getUser);

    const availableUnit = process.env.REACT_APP_AVAILABLE_UNITS?.split(",") || [];

    const getKcals = () => {
        const quantity = props.unit === "g" ? props.quantity : props.quantityGram;
        const controller = new AbortController();
        if (props.foodId && currentUser) {
            getFoodKcal(props.foodId,
                quantity,
                currentUser.id,
                controller)
                .then((response) => {
                    props.onKcalsChanged(response || 0)
                })
                .catch((error) => {
                    dispatch(setError(error.message));
                })
        } else {
            dispatch(setError(strings.featureNotAvailableError));
        }

    }

    return <Grid item xs={8} className={"text-center"}>
        <Grid container columns={8}>
            {
                /**
                 * When props.foodName is undefined, the food name is not editable because it is already set by
                 * grocery-be service
                 */
                props.foodName !== undefined ?
                    <Grid item xs={8}>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor="food-name-required">{strings.foodConsumptionNameLabel}</InputLabel>
                            <OutlinedInput
                                required
                                id="food-name-required"
                                label={strings.foodConsumptionNameLabel}
                                value={props.foodName}
                                onChange={(event) => props.onFoodNameChanged(event.target.value)}
                            />
                        </FormControl>
                    </Grid> : <div/>
            }
            <Grid item xs={8}>
                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                    <InputLabel htmlFor="quantity-required">{strings.foodConsumptionQuantityLabel}</InputLabel>
                    <OutlinedInput
                        required
                        id="quantity-required"
                        label={strings.foodConsumptionQuantityLabel}
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
                /**
                 * when props.foodName is undefined, it means that is an external food so the unit can be edited
                 */
                (props.foodName !== undefined) ?
                    <Grid item xs={8}>
                        <TextField
                            required
                            select
                            id="outlined"
                            label={strings.foodConsumptionUnitLabel}
                            value={props.unit}
                            onChange={(event) => {
                                if (props.onUnitChanged) {
                                    props.onUnitChanged(event.target.value)
                                }
                            }}
                        >
                            {availableUnit.map((unit) => <MenuItem key={unit} value={unit}>{unit}</MenuItem>)}
                        </TextField>
                    </Grid> : null
            }
            {
                (props.unit !== 'g') && (props.unit !== 'ml') ?
                    <Grid item xs={8}>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor="quantity-g-required">{strings.foodConsumptionQuantityGramsLabel}</InputLabel>
                            <OutlinedInput
                                required
                                id="quantity-g-required"
                                label={strings.foodConsumptionQuantityGramsLabel}
                                value={props.quantityGram}
                                type={"number"}
                                onChange={(event) => props.onQuantityGramChanged(Number.parseFloat(event.target.value))}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Typography>g/ml</Typography>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid> : null
            }
            <Grid item xs={8}>
                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                    <InputLabel htmlFor="kcals-required">{strings.foodConsumptionKcalLabel}</InputLabel>
                    <OutlinedInput
                        required
                        id="kcals-required"
                        label={strings.foodConsumptionKcalLabel}
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
                /**
                 * When props.cost is undefined, the cost is not editable because it is already set by
                 * grocery-be service
                 */
                props.cost !== undefined ?
                    <Grid item xs={8}>
                        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                            <InputLabel htmlFor="cost-required">{strings.foodConsumptionCostLabel}</InputLabel>
                            <OutlinedInput
                                required
                                id="cost-required"
                                label={strings.foodConsumptionCostLabel}
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
