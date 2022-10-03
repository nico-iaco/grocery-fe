import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteItem, getAllItems} from "../../api/itemApis";
import {AppBar, Box, Button, Container, Grid, List, Toolbar, Typography} from "@mui/material";
import {ItemRowComponent} from "../../component/ItemRowComponent";
import {useDispatch} from "react-redux";
import {Item} from "../../model/item";
import {setCurrentItem} from "../../action/Action";


export function Home() {
    const dispatch = useDispatch();
    const [itemList, setItemList] = useState<Item[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        getAllItems()
            .then(value => {
                if (value) {
                    setItemList(value)
                }
            })
            .catch(reason => console.error(reason));
    }, [])

    const goToAddItem = () => {
        navigate("/item");
    }

    const goToItemTransaction = (item: Item) => {
        dispatch(setCurrentItem(item))
        navigate(`/item/${item.id}/`);
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
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                barcode={item.barcode}
                                quantity={item.availableQuantity || 0}
                                unit={item.unit || ""}
                                onButtonClick={() => deleteItemFromList(item.id)}
                                onClick={() => goToItemTransaction(item)}/>
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
