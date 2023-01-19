import {Button, Container, Fab, Grid, Typography} from "@mui/material";
import {Add, ArrowBack, Edit} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getShoppingList} from "../../selector/Selector";
import {NoDataAvailableComponent} from "../../component/NoDataAvailableComponent";
import {SimpleItemWithButtonComponent} from "../../component/SimpleItemWithButtonComponent";
import {clearShoppingList, setCurrentShoppingItem, setError} from "../../action/Action";
import {ShoppingItem} from "../../model/shoppingItem";
import {addShoppingItemList} from "../../api/itemApis";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";

const LiveGroceryShoppingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const itemList = useSelector(getShoppingList);
    const total = itemList.reduce((acc, item) => acc + item.transaction.price, 0);

    const goToAddItemToCart = () => {
        navigate("/live/add");
    }

    const goBack = () => {
        navigate(-1);
    }

    const goToEditItem = (shoppingItem: ShoppingItem) => {
        dispatch(setCurrentShoppingItem(shoppingItem));
        navigate(`/live/edit/${shoppingItem.item.barcode}`);
    }

    const applyShoppingList = () => {
        const controller = new AbortController();
        addShoppingItemList(itemList, controller)
            .then(() => {
                dispatch(clearShoppingList());
                navigate(-1);
            })
            .catch((error) => {
                console.log(error);
                dispatch(setError(error));
            })
    }

    const clearCart = () => {
        dispatch(clearShoppingList())
    }


    return (
        <Grid container columns={8}>
            <Grid item xs={8}>
                <AppBarComponent
                    title={strings.liveGroceryShoppingTitle}
                    leftButton={{
                        icon: <ArrowBack/>,
                        onClick: goBack
                    }}
                />
            </Grid>
            <Container className="container">
                <Grid item xs={8} className="container">
                    {
                        itemList.length > 0 ?
                            itemList
                                .map(item => {
                                    return <SimpleItemWithButtonComponent
                                        mainText={item.item.name}
                                        subText={`${item.transaction.price} €   ${item.transaction.quantity} ${item.transaction.unit}`}
                                        onItemClicked={() => {}}
                                        icon={<Edit/>}
                                        onButtonClicked={() => goToEditItem(item)}
                                    />
                                })
                            : <NoDataAvailableComponent/>
                    }
                </Grid>
                <Grid item xs={8} className="container">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <b>Total:</b> {total} €
                    </Typography>
                </Grid>
                <Grid item xs={8} className="container">
                    <Button variant="contained" color="success" onClick={applyShoppingList}>Apply</Button>
                    <Button variant="contained" color="error" onClick={clearCart}>Discard</Button>
                </Grid>
                <Fab
                    color="secondary"
                    sx={{position: 'fixed', bottom: 70, right: 8}}
                    onClick={goToAddItemToCart}
                >
                    <Add/>
                </Fab>
            </Container>
        </Grid>
    )
}

export default LiveGroceryShoppingPage;