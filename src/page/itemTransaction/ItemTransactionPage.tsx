import {useNavigate} from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    Container,
    Fab,
    Grid,
    IconButton,
    List,
    Skeleton,
    Toolbar,
    Typography
} from "@mui/material";
import {Transaction} from "../../model/transaction";
import {TransactionRowComponent} from "../../component/TransactionRowComponent";
import {Add, ArrowBack} from "@mui/icons-material";
import "./ItemTransactionPage.css";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentItem, getUser} from "../../selector/Selector";
import {setCurrentItem, setCurrentTransaction} from "../../action/Action";
import {useTransactionList} from "../../hooks/useTransactionList";
import {useItemDetail} from "../../hooks/useItemDetail";

function ItemTransactionPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentItem = useSelector(getCurrentItem);
    const currentUser = useSelector(getUser);
    const itemTransactionList = useTransactionList(currentUser?.id || "", currentItem?.id || "", false);
    const itemDetails = useItemDetail(currentItem?.id || "", currentUser?.id || "");

    const goToAddTransactionPage = () => {
        navigate(`/item/${currentItem?.id}/transaction/add`);
    }

    const goBack = () => {
        dispatch(setCurrentItem(undefined));
        navigate(`/item`);
    }

    const goToEditTransactionPage = (transaction: Transaction) => {
        dispatch(setCurrentTransaction(transaction));
        navigate(`/item/${currentItem?.id}/transaction/${transaction.id}/edit`);
    }

    const goToEditItemPage = () => {
        navigate(`/item/${currentItem?.id}/edit`);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="back"
                                sx={{mr: 2}}
                                onClick={goBack}
                            >
                                <ArrowBack/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                {currentItem?.name} transactions
                            </Typography>
                            <Button onClick={goToEditItemPage} color="inherit">Edit</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Container className="container">
                <Grid item xs={12}>
                    {
                        itemDetails?.image_nutrition_url ?
                            <img src={itemDetails?.image_nutrition_url} className="content-image" alt="nutrition-table" height={320}/>
                            : <Skeleton variant="rectangular" height={320}/>
                    }
                    <List className="list-container">
                        {itemTransactionList.map(transaction => {
                            return <TransactionRowComponent
                                key={transaction.id}
                                id={transaction.id}
                                seller={transaction.seller}
                                quantity={transaction.quantity}
                                availableQuantity={transaction.availableQuantity}
                                unit={transaction.unit}
                                price={transaction.price}
                                expirationDate={transaction.expirationDate}
                                onTransactionClick={() => {
                                }}
                                onTransactionButtonClick={() => goToEditTransactionPage(transaction)}
                            />
                        })}
                    </List>
                </Grid>
                <Fab
                    //mainButtonStyles={{backgroundColor: '#1677d7'}}
                    color="primary"
                    sx={{position: 'fixed', bottom: 62, right: 8}}
                    //alwaysShowTitle={true}
                    //event="click"
                    onClick={goToAddTransactionPage}
                >
                    <Add/>
                </Fab>
            </Container>
        </Grid>);
}

export default ItemTransactionPage;
