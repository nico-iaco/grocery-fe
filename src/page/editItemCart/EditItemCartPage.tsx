import {ShoppingItem} from "../../model/shoppingItem";
import {Button, Container, Grid2} from "@mui/material";
import {ItemDataDisplayComponent} from "../../component/ItemDataDisplayComponent";
import {TransactionDataDisplayComponent} from "../../component/TransactionDataDisplayComponent";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {getCurrentPantry, getCurrentShoppingItem} from "../../selector/Selector";
import {Item} from "../../model/item";
import {Transaction} from "../../model/transaction";
import {removeFromShoppingList, updateShoppingList} from "../../action/Action";
import {ArrowBack} from "@mui/icons-material";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";


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

    const currentPantry = useSelector(getCurrentPantry);


    const goBack = () => {
        navigate(-1);
    }

    const editItem = () => {
        console.log("add to cart");

        const item: Item = {
            id: currentShoppingItem?.item.id || "",
            pantryId: currentPantry?.id || "",
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

    const deleteItemFromCart = () => {
        if (currentShoppingItem) {
            dispatch(removeFromShoppingList(currentShoppingItem))
            navigate(-1);
        }
    }

    return (
        <Grid2 container columns={8} sx={{
            '& .MuiTextField-root': {m: 1, width: '25ch'},
        }}>
            <Grid2 size={8}>
                <AppBarComponent
                    title={strings.editItemCartTitle}
                    leftButton={{
                        icon: <ArrowBack/>,
                        onClick: goBack
                    }}
                    rightButton={<Button onClick={deleteItemFromCart} color="inherit">{strings.deleteButtonLabel}</Button>}
                />
            </Grid2>
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
                <Grid2 size={8}>
                    <Button variant="contained" color="success" onClick={editItem}>{strings.editButtonLabel}</Button>
                </Grid2>
            </Container>
        </Grid2>
    )
}

export default EditItemCartPage;