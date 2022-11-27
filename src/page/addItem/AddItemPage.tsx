import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Item} from "../../model/item";
import {addItem} from "../../api/itemApis";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {ItemDataComponent} from "../../component/ItemDataComponent";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentItem, setError} from "../../action/Action";
import {getUser} from "../../selector/Selector";
import {getAnalytics, logEvent} from "firebase/analytics";

export function AddItemPage () {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [barcode, setBarcode] = useState("");
    const [vendor, setVendor] = useState("");
    const navigate = useNavigate();
    const user = useSelector(getUser);

    const analytics = getAnalytics();

    const goBack = () => {
        navigate(`/item`);
    }

    const sendItemToBe = () => {
      const item: Item = {
          id: "",
          userId: user?.id || "",
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
                                    Add food
                                </Typography>
                                <Button disabled></Button>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </Grid>
                <Container className="container">
                    <ItemDataComponent
                        name={name}
                        onNameChange={(v) => setName(v)}
                        barcode={barcode}
                        onBarcodeChange={(v) => setBarcode(v)}
                        vendor={vendor}
                        onVendorChange={(v) => setVendor(v)}
                        buttonText="Add"
                        onButtonClick={sendItemToBe}
                    />
                </Container>
            </Grid>
    );
}
