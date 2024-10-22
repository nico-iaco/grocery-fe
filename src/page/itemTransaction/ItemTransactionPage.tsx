import {useNavigate} from "react-router-dom";
import {Button, Container, Fab, Grid2, List, Skeleton} from "@mui/material";
import {Transaction} from "../../model/transaction";
import {TransactionRowComponent} from "../../component/TransactionRowComponent";
import {Add, ArrowBack} from "@mui/icons-material";
import "./ItemTransactionPage.css";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentItem, getCurrentPantry} from "../../selector/Selector";
import {setCurrentItem, setCurrentTransaction} from "../../action/Action";
import {useTransactionList} from "../../hooks/useTransactionList";
import {useItemDetail} from "../../hooks/useItemDetail";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";

function ItemTransactionPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentItem = useSelector(getCurrentItem);
    const currentPantry = useSelector(getCurrentPantry);
    const itemTransactionList = useTransactionList(currentPantry?.id || "", currentItem?.id || "", false);
    const itemDetails = useItemDetail(currentPantry?.id || "", currentPantry?.id || "");

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
        <Grid2 container>
            <Grid2 size={12}>
                <AppBarComponent
                    title={currentItem?.name || ""}
                    leftButton={{
                        icon: <ArrowBack/>,
                        onClick: goBack
                    }}
                    rightButton={<Button onClick={goToEditItemPage} color="inherit">{strings.editButtonLabel}</Button>}
                />
            </Grid2>
            <Container className="container">
                <Grid2 size={12}>
                    {
                        itemDetails?.image_nutrition_url ?
                            <img src={itemDetails?.image_nutrition_url} className="content-image" alt="nutrition-table"
                                 height={320}/>
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
                </Grid2>
                <Fab
                    color="secondary"
                    className={"fab"}
                    onClick={goToAddTransactionPage}
                >
                    <Add/>
                </Fab>
            </Container>
        </Grid2>);
}

export default ItemTransactionPage;
