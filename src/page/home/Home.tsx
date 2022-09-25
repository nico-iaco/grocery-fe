import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteItem, getAllItems} from "../../api/itemApis";
import {Item} from "../../model/item";
import {AppBar, Box, Button, Container, Grid, List, Toolbar, Typography} from "@mui/material";
import {ItemRowComponent} from "../../component/ItemRowComponent";


export function Home() {
    const [itemList, setItemList] = useState<Item[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        getAllItems()
            .then(value => {
                console.log(value)
                setItemList(value || [])
            })
            .catch(reason => console.error(reason));
    }, [])

    const goToAddItem = () => {
        navigate("/item");
    }

    const goToItemTransaction = (id: string, name: string) => {
        navigate(`/item/${id}/${name}`);
    }

    const deleteItemFromList = (id: string) => {
        deleteItem(id)
            .then(v => {
                console.log(v);
                setItemList(itemList.filter(value => value.id !== id))
            })
            .catch(reason => console.error(reason));
    }

    return (
        <Container>
            <Grid container columns={8}>
                <Grid item xs={8}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="sticky" className="AppBar">
                            <Toolbar>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Food available
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <List>
                        {itemList.map(item => {
                            return <ItemRowComponent
                                id={item.id}
                                name={item.name}
                                barcode={item.barcode}
                                quantity={item.availableQuantity || 0}
                                unit={item.unit || ""}
                                onButtonClick={() => deleteItemFromList(item.id)}
                                onClick={() => goToItemTransaction(item.id, item.name)}/>
                        })}
                    </List>
                </Grid>
                <Grid item xs={8}>
                    <Button variant="contained" onClick={goToAddItem}>
                        Add item
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
