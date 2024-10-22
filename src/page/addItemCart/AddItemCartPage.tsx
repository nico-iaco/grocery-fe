import {Button, Container, Grid2} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {ItemDataDisplayComponent} from "../../component/ItemDataDisplayComponent";
import {useState} from "react";
import {TransactionDataDisplayComponent} from "../../component/TransactionDataDisplayComponent";
import {Item} from "../../model/item";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPantry} from "../../selector/Selector";
import {Transaction} from "../../model/transaction";
import {ShoppingItem} from "../../model/shoppingItem";
import {addToShoppingList} from "../../action/Action";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";

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

    const currentPantry = useSelector(getCurrentPantry);


    const goBack = () => {
        navigate(-1);
    }

    const addToCart = () => {
        console.log("add to cart");

        const item: Item = {
            id: "",
            pantryId: currentPantry?.id || "",
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
        <Grid2 container columns={8} sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>
            <Grid2 size={8}>
                <AppBarComponent
                    title={strings.addItemCartTitle}
                    leftButton={{
                        icon: <ArrowBack/>,
                        onClick: goBack
                    }}
                />
            </Grid2>
            <Container className="container text-center">
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
                <Grid2 size={8}>
                    <Button variant="contained" color="secondary" onClick={addToCart}>
                        {strings.addToCartButtonLabel}
                    </Button>
                </Grid2>
            </Container>
        </Grid2>
    );
}

export default AddItemCartPage;