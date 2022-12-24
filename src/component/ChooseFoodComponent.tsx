import {Item} from "../model/item";
import {useDispatch, useSelector} from "react-redux";
import {StepperComponentProps} from "../page/addFoodConsumption/AddFoodConsumptionPage";
import {Button, Grid, List, Paper} from "@mui/material";
import {SimpleItemRowComponent} from "./SimpleItemRowComponent";
import {setCurrentItem, setError} from "../action/Action";
import {getCurrentItem, getUser} from "../selector/Selector";
import {useFoodList} from "../hooks/useFoodList";


const ChooseFoodComponent = (props: StepperComponentProps) => {
    const dispatch = useDispatch();
    const currentFood = useSelector(getCurrentItem);
    const currentUser = useSelector(getUser);

    const foodList = useFoodList( true, currentUser?.id || "");

    const onFoodClicked = (item: Item) => {
        dispatch(setCurrentItem(item));
    }

    const next = () => {
        if (currentFood !== undefined) {
            props.onNextClicked();
        } else {
            dispatch(setError("Please select a food"));
        }
    }

    const skip = () => {
        dispatch(setCurrentItem(undefined));
        props.onSkipClicked();
    }

    return <Grid item xs={8}>
        <Grid container columns={8}>
            <Grid item xs={8}>
                <List>
                    {foodList.map((item) => {
                        return <div key={item.id} style={{padding: 8}}>
                            <Paper variant="outlined" className={currentFood !== undefined && item.id === currentFood.id ? "list-item-selected" : "list-item"}>
                                <SimpleItemRowComponent mainText={item.name} subText={`${item.availableQuantity} ${item.unit}`} onClick={() => {onFoodClicked(item)}}/>
                            </Paper>
                        </div>
                    })}
                </List>
            </Grid>
            <Grid item xs={8}>
                <Grid container columns={8}>
                    <Grid item xs={4} className="center">
                        {
                            props.isPreviousAvailable && <Button onClick={props.onPreviousClicked}>Previous</Button>
                        }
                    </Grid>
                    <Grid item xs={4} className="center">
                        {
                            props.isSkipAvailable && <Button onClick={skip}>Skip</Button>
                        }
                        {
                            props.isNextAvailable && <Button onClick={next}>Next</Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}

export default ChooseFoodComponent;
