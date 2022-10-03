import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getItem, updateItem} from "../../api/itemApis";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {ItemDataComponent} from "../../component/ItemDataComponent";
import {Item} from "../../model/item";
import {useSelector} from "react-redux";
import {getCurrentItem} from "../../selector/Selector";

export const EditItemPage = () => {
    const currentItem = useSelector(getCurrentItem);
    const [name, setName] = useState(currentItem?.name || "");
    const [barcode, setBarcode] = useState(currentItem?.barcode || "");
    const navigate = useNavigate();

    const updateItemToBe = () => {
        const updatedItem: Item = {
            id: currentItem?.id || "",
            name,
            barcode
        }
        updateItem(updatedItem)
            .then(value => {
                console.log(value);
                goBack();
            })
            .catch(reason => console.error(reason));
    }

    const goBack = () => {
        navigate(`/item/${currentItem?.id}`);
    }

    return <Container>
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
                                Edit {currentItem?.name}
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
                buttonText="Update"
                onButtonClick={updateItemToBe}
            />
        </Grid>
    </Container>
}
