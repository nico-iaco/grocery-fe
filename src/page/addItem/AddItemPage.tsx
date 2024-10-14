import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Item} from "../../model/item";
import {addItem} from "../../api/itemApis";
import {Container, Grid2} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {ItemDataComponent} from "../../component/ItemDataComponent";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentItem, setError} from "../../action/Action";
import {getCurrentPantry} from "../../selector/Selector";
import {getAnalytics, logEvent} from "firebase/analytics";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";

function AddItemPage () {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [barcode, setBarcode] = useState("");
    const [vendor, setVendor] = useState("");
    const navigate = useNavigate();
    const pantry = useSelector(getCurrentPantry);

    const analytics = getAnalytics();

    const goBack = () => {
        navigate(-1);
    }

    const sendItemToBe = () => {
      const item: Item = {
          id: "",
          pantryId: pantry?.id || "",
          name,
          barcode,
          vendor
      };
      const controller = new AbortController();
      addItem(item, controller)
          .then(value => {
              logEvent(analytics, 'add_item', item);
              dispatch(setCurrentItem(value));
              navigate(`/item/${value?.id}/transaction`);
          })
          .catch(reason => {
              console.error(reason)
              dispatch(setError(reason.message));
          });
    };


    return (
            <Grid2 container columns={8} sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>
                <Grid2 size={8}>
                    <AppBarComponent
                        title={strings.addItemTitle}
                        leftButton={{
                            icon: <ArrowBack/>,
                            onClick: goBack
                        }}
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
                        buttonText={strings.addButtonLabel}
                        onButtonClick={sendItemToBe}
                    />
                </Container>
            </Grid2>
    );
}

export default AddItemPage;
