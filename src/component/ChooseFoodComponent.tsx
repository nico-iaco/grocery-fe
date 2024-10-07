import {Item} from "../model/item";
import {useDispatch, useSelector} from "react-redux";
import {StepperComponentProps} from "../page/addFoodConsumption/AddFoodConsumptionPage";
import {Button, Grid2, List, Paper} from "@mui/material";
import {SimpleItemRowComponent} from "./SimpleItemRowComponent";
import {setCurrentItem, setError} from "../action/Action";
import {getCurrentItem, getUser} from "../selector/Selector";
import {useFoodList} from "../hooks/useFoodList";
import {ListLoadingComponent} from "./ListLoadingComponent";
import {strings} from "../localization/strings";
import {useState} from "react";
import SearchComponent from "./SearchComponent";


const ChooseFoodComponent = (props: StepperComponentProps) => {
    const dispatch = useDispatch();
    const currentFood = useSelector(getCurrentItem);
    const currentUser = useSelector(getUser);
    const [search, setSearch] = useState("");

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

    return <Grid2 size={8}>
        <Grid2 container columns={8}>
            <SearchComponent
                search={search}
                onSearchChanged={setSearch}
            />
            <Grid2 size={8}>
                {
                    foodList.length > 0 ?
                        <List>
                            {foodList
                                .filter(value => search === "" || (value.name.toLowerCase().includes(search.toLowerCase()) || value.barcode.includes(search)))
                                .map((item) => {
                                    return <div key={item.id} style={{padding: 8}}>
                                        <Paper variant="outlined"
                                               className={currentFood !== undefined && item.id === currentFood.id ? "list-item-selected" : "list-item"}>
                                            <SimpleItemRowComponent mainText={item.name}
                                                                    subText={`${item.availableQuantity} ${item.unit}`}
                                                                    onClick={() => {
                                                                        onFoodClicked(item)
                                                                    }}/>
                                    </Paper>
                                </div>
                            })}
                        </List> : <ListLoadingComponent listItemNumber={8} />
                }
            </Grid2>
            <Grid2 size={8}>
                <Grid2 container columns={8}>
                    <Grid2 size={4} className="center">
                        {
                            props.isPreviousAvailable && <Button color={"secondary"} onClick={props.onPreviousClicked}>{strings.previousButtonLabel}</Button>
                        }
                    </Grid2>
                    <Grid2 size={4} className="center">
                        {
                            props.isSkipAvailable && <Button color={"secondary"} onClick={skip}>{strings.skipButtonLabel}</Button>
                        }
                        {
                            props.isNextAvailable && <Button color={"secondary"} onClick={next}>{strings.nextButtonLabel}</Button>
                        }
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>
    </Grid2>
}

export default ChooseFoodComponent;
