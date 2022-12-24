import {ShoppingItem} from "../../model/shoppingItem";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {ItemDataDisplayComponent} from "../../component/ItemDataDisplayComponent";
import {TransactionDataDisplayComponent} from "../../component/TransactionDataDisplayComponent";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {getCurrentShoppingItem, getUser} from "../../selector/Selector";
import {Item} from "../../model/item";
import {Transaction} from "../../model/transaction";
import {updateShoppingList} from "../../action/Action";
import {ArrowBack} from "@mui/icons-material";


const EditItemCartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const currentShoppingItem = useSelector(getCurrentShoppingItem);
    
    const [name, setName] = useState<string>(currentShoppingItem?.item.name || "");
    const [barcode, setBarcode] = useState<string>(currentShoppingItem?.item.barcode || "");
    const [vendor, setVendor] = useState<string>(currentShoppingItem?.item.vendor || "");

    const [seller, setSeller] = useState<string>(currentShoppingItem?.transaction.seller || "");
    const [quantity, setQuantity] = useState<number>(currentShoppingItem?.transaction.quantity || 0);
    const [unit, setUnit] = useState<string>(currentShoppingItem?.transaction.unit || "");
    const [quantityStd, setQuantityStd] = useState<number>(currentShoppingItem?.transaction.quantityStd || 0);
    const [price, setPrice] = useState<number>(currentShoppingItem?.transaction.price || 0);
    const [expirationDate, setExpirationDate] = useState<Date>(currentShoppingItem?.transaction.expirationDate || new Date());
    const [purchaseDate, setPurchaseDate] = useState<Date>(currentShoppingItem?.transaction.purchaseDate || new Date());

    const currentUser = useSelector(getUser);


    const goBack = () => {
        navigate(-1);
    }

    const editItem = () => {
        console.log("add to cart");

        const item: Item = {
            id: currentShoppingItem?.item.id || "",
            userId: currentUser?.id || "",
            name: name,
            barcode: barcode,
            vendor: vendor
        }

        const transaction: Transaction = {
            id: currentShoppingItem?.transaction.id || "",
            seller: seller,
            availableQuantity: quantity,
            quantity: quantity,
            unit: unit,
            quantityStd: quantityStd,
            price: price,
            expirationDate: expirationDate,
            purchaseDate: purchaseDate
        }

        const shoppingItem: ShoppingItem = {
            item: item,
            transaction: transaction
        }

        dispatch(updateShoppingList(shoppingItem));
        navigate(-1);

    }

    return (
        <Grid container columns={8} sx={{
            '& .MuiTextField-root': {m: 1, width: '25ch'},
        }}>
            <Grid item xs={8}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                                onClick={goBack}
                            >
                                <ArrowBack/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Edit item
                            </Typography>
                            <Button disabled></Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Container className="container">
                <ItemDataDisplayComponent
                    name={name}
                    onNameChange={setName}
                    barcode={barcode}
                    onBarcodeChange={setBarcode}
                    vendor={vendor}
                    onVendorChange={setVendor}
                />
                <TransactionDataDisplayComponent
                    seller={seller}
                    onSellerChange={setSeller}
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    unit={unit}
                    onUnitChange={setUnit}
                    quantityGram={quantityStd}
                    onQuantityGramChange={setQuantityStd}
                    price={price}
                    onPriceChange={setPrice}
                    expirationDate={expirationDate}
                    onExpirationDateChange={setExpirationDate}
                    purchaseDate={purchaseDate}
                    onPurchaseDateChange={setPurchaseDate}
                />
                <Grid item xs={8}>
                    <Button variant="contained" color="success" onClick={editItem}>Edit</Button>
                </Grid>
            </Container>
        </Grid>
    )
}

export default EditItemCartPage;