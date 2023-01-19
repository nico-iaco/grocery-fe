import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Item} from "../../model/item";
import {useNavigate} from "react-router-dom";
import {setCurrentItem, setCurrentTabIndex} from "../../action/Action";
import {
    Container,
    Fab,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    List,
    OutlinedInput
} from "@mui/material";
import {ItemRowComponent} from "../../component/ItemRowComponent";
import {Add, Search} from "@mui/icons-material";
import {getUser} from "../../selector/Selector";
import {NoDataAvailableComponent} from "../../component/NoDataAvailableComponent";
import {useItemList} from "../../hooks/useItemList";
import {AppBarComponent} from "../../component/AppBarComponent";
import {ListLoadingComponent} from "../../component/ListLoadingComponent";
import {strings} from "../../localization/strings";

const ItemDashboardPage = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const currentUser = useSelector(getUser);
    const navigate = useNavigate();
    const {itemList, isDataAvailable} = useItemList(false, currentUser?.id || "");

    useEffect(() => {
        dispatch(setCurrentTabIndex(2));
    }, [])

    const goToAddItem = () => {
        navigate("/item/add");
    }

    const goToItemTransaction = (item: Item) => {
        dispatch(setCurrentItem(item))
        navigate(`/item/${item.id}/transaction`);
    }

    const goToEditItem = (item: Item) => {
        dispatch(setCurrentItem(item))
        navigate(`/item/${item.id}/edit`);
    }


    return (
        <Grid container columns={8}>
            <Grid item xs={8}>
                <AppBarComponent
                    title={strings.groceryTitle}
                />
            </Grid>
            <Container className="container">
                <Grid item xs={8}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-search"
                            type={'text'}
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                    >
                                        <Search/>
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="search"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <List className="list-container">
                        {
                            isDataAvailable ?
                                (itemList.length > 0 ?
                                    itemList
                                        .filter(value => search === "" || (value.name.toLowerCase().includes(search.toLowerCase()) || value.barcode.includes(search)))
                                        .map(item => {
                                            return <ItemRowComponent
                                                key={item.id}
                                                id={item.id}
                                                name={item.name}
                                                barcode={item.barcode}
                                                quantity={item.availableQuantity || 0}
                                                unit={item.unit || ""}
                                                onButtonClick={() => goToEditItem(item)}
                                                onClick={() => goToItemTransaction(item)}/>
                                        })
                                    : <NoDataAvailableComponent/>)
                                : <ListLoadingComponent listItemNumber={8} />
                        }
                    </List>
                </Grid>
                <Fab
                    color="secondary"
                    className={"fab"}
                    onClick={goToAddItem}
                >
                    <Add/>
                </Fab>
            </Container>
        </Grid>
    );
}

export default ItemDashboardPage;