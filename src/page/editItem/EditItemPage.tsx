import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {deleteItem, updateItem} from "../../api/itemApis";
import {Button, Container, Grid2} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {ItemDataComponent} from "../../component/ItemDataComponent";
import {Item} from "../../model/item";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentItem, getCurrentPantry, getUser} from "../../selector/Selector";
import {setCurrentItem, setError} from "../../action/Action";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";

const EditItemPage = () => {
    const currentItem = useSelector(getCurrentItem);
    const user = useSelector(getUser);
    const pantry = useSelector(getCurrentPantry);
    const [name, setName] = useState(currentItem?.name || "");
    const [barcode, setBarcode] = useState(currentItem?.barcode || "");
    const [vendor, setVendor] = useState(currentItem?.vendor || "");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateItemToBe = () => {
        const updatedItem: Item = {
            id: currentItem?.id || "",
            pantryId: pantry?.id || "",
            name,
            barcode,
            vendor
        }
        const controller = new AbortController();
        updateItem(updatedItem, pantry?.id || "", controller)
            .then(goBack)
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message));
            });
    }

    const goBack = () => {
        navigate(-1);
    }

    const deleteItemFromServer = () => {
        const controller = new AbortController();
        deleteItem(currentItem?.id || "", pantry?.id || "", controller)
            .then(v => {
                console.log(v);
                dispatch(setCurrentItem(undefined));
                navigate("/item");
            })
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message));
            });
    }

    return <Grid2 container columns={8} sx={{
        '& .MuiTextField-root': {m: 1, width: '25ch'},
    }}>
        <Grid2 size={8}>
            <AppBarComponent
                title={strings.formatString(strings.editItemTitle, currentItem?.name || "").toString()}
                leftButton={{
                    icon: <ArrowBack/>,
                    onClick: goBack
                }}
                rightButton={<Button onClick={deleteItemFromServer} color="inherit">{strings.deleteButtonLabel}</Button>}
            />
        </Grid2>
        <Container className="container">
            <ItemDataComponent
                name={name}
                onNameChange={(v) => setName(v)}
                barcode={barcode}
                onBarcodeChange={(v) => setBarcode(v)}
                vendor={vendor}
                onVendorChange={(v) => setVendor(v)}
                buttonText={strings.editButtonLabel}
                onButtonClick={updateItemToBe}
            />
        </Container>
    </Grid2>
}

export default EditItemPage;