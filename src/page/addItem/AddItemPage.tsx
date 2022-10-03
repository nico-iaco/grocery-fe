import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Item} from "../../model/item";
import {addItem} from "../../api/itemApis";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {ItemDataComponent} from "../../component/ItemDataComponent";
import {useDispatch} from "react-redux";
import {setCurrentItem} from "../../action/Action";

export function AddItemPage () {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [barcode, setBarcode] = useState("");
    const navigate = useNavigate();

    const goBack = () => {
        navigate(`/`);
    }

    const sendItemToBe = () => {
      const item: Item = {
          id: "",
          name,
          barcode
      };
      addItem(item)
          .then(value => {
              dispatch(setCurrentItem(value));
              navigate(`/item/${value?.id}`);
          })
          .catch(reason => console.error(reason));
    };


    return (
        <Container>
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
                <ItemDataComponent
                    name={name}
                    onNameChange={(v) => setName(v)}
                    barcode={barcode}
                    onBarcodeChange={(v) => setBarcode(v)}
                    buttonText="Add"
                    onButtonClick={sendItemToBe}
                />
            </Grid>

        </Container>
    );
}
