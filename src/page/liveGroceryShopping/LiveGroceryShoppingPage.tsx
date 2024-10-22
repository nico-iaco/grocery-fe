import {Button, Container, Fab, Grid2, Typography} from "@mui/material";
import {Add, ArrowBack, Edit} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPantry, getShoppingList} from "../../selector/Selector";
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
    const currentPantry = useSelector(getCurrentPantry);
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
        addShoppingItemList(itemList,
            currentPantry?.id || "",
            controller)
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
        <Grid2 container columns={8}>
            <Grid2 size={8}>
                <AppBarComponent
                    title={strings.liveGroceryShoppingTitle}
                    leftButton={{
                        icon: <ArrowBack/>,
                        onClick: goBack
                    }}
                />
            </Grid2>
            <Container className="container">
                <Grid2 size={8} className="container">
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
                </Grid2>
                <Grid2 size={8} className="container">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <b>{strings.shoppingCartTotalLabel}</b> {total} €
                    </Typography>
                </Grid2>
                <Grid2 size={8} className="container">
                    <Grid2 container spacing={2}>
                        <Grid2 size={6} className={"center"}>
                            <Button variant="contained" color="success" onClick={applyShoppingList}>
                                {strings.shoppingCartApplyButtonLabel}
                            </Button>
                        </Grid2>
                        <Grid2 size={6} className={"center"}>
                            <Button variant="contained" color="error" onClick={clearCart}>
                                {strings.shoppingCartDiscardButtonLabel}
                            </Button>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Fab
                    color="secondary"
                    className={"fab"}
                    onClick={goToAddItemToCart}
                >
                    <Add/>
                </Fab>
            </Container>
        </Grid2>
    )
}

export default LiveGroceryShoppingPage;