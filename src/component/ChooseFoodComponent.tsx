import {useEffect, useState} from "react";
import {Item} from "../model/item";
import {getAllItems} from "../api/itemApis";
import {useDispatch, useSelector} from "react-redux";
import {StepperComponentProps} from "../page/addFoodConsumption/AddFoodConsumptionPage";
import {Button, Grid, List, Paper} from "@mui/material";
import {SimpleItemRowComponent} from "./SimpleItemRowComponent";
import {setCurrentItem, setError} from "../action/Action";
import {getCurrentItem} from "../selector/Selector";


export const ChooseFoodComponent = (props: StepperComponentProps) => {
    const dispatch = useDispatch();
    const [foodList, setFoodList] = useState<Item[]>([]);
    const currentFood = useSelector(getCurrentItem);

    useEffect(() => {
        getAllItems(true)
            .then((items) => {
                setFoodList(items || []);
            })
            .catch((error) => {
                console.log(error);
                dispatch(setError(error.message));
            });
    }, []);

    const onFoodClicked = (item: Item) => {
        dispatch(setCurrentItem(item));
    }

    const next = () => {
        if (currentFood !== undefined) {
            props.onNextClicked();
        }
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
                            props.isNextAvailable && <Button onClick={next}>Next</Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}
