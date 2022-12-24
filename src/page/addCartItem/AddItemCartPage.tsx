import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {ItemDataDisplayComponent} from "../../component/ItemDataDisplayComponent";
import {useState} from "react";
import {TransactionDataDisplayComponent} from "../../component/TransactionDataDisplayComponent";
import {Item} from "../../model/item";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../selector/Selector";
import {Transaction} from "../../model/transaction";
import {ShoppingItem} from "../../model/shoppingItem";
import {addToShoppingList} from "../../action/Action";

const AddItemCartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState<string>("");
    const [barcode, setBarcode] = useState<string>("");
    const [vendor, setVendor] = useState<string>("");

    const [seller, setSeller] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [unit, setUnit] = useState<string>("");
    const [quantityStd, setQuantityStd] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [expirationDate, setExpirationDate] = useState<Date>(new Date());
    const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());

    const currentUser = useSelector(getUser);


    const goBack = () => {
        navigate(-1);
    }

    const addToCart = () => {
        console.log("add to cart");

        const item: Item = {
            id: "",
            userId: currentUser?.id || "",
            name: name,
            barcode: barcode,
            vendor: vendor
        }

        const transaction: Transaction = {
            id: "",
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

        dispatch(addToShoppingList(shoppingItem));
        navigate(-1);

    }

    return (
        <Grid container columns={8} sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>
            <Grid item xs={8}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={goBack}
                            >
                                <ArrowBack />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Add to cart
                            </Typography>
                            <Button disabled></Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Container className="container">
                <ItemDataDisplayComponent
                    name={name}
                    onNameChange={(v) => setName(v)}
                    barcode={barcode}
                    onBarcodeChange={(v) => setBarcode(v)}
                    vendor={vendor}
                    onVendorChange={(v) => setVendor(v)}
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
                    <Button variant="contained" color="success" onClick={addToCart}>Add to cart</Button>
                </Grid>
            </Container>
        </Grid>
    );
}

export default AddItemCartPage;