import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {Item} from "../../model/item";
import {useNavigate} from "react-router-dom";
import {getAllItems} from "../../api/itemApis";
import {setCurrentItem} from "../../action/Action";
import {AppBar, Box, Button, Container, Grid, List, Toolbar, Typography} from "@mui/material";
import {ItemRowComponent} from "../../component/ItemRowComponent";
import {Add} from "@mui/icons-material";
import {Fab} from "react-tiny-fab";

export const ItemDashboardPage = (props: any) => {
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
        navigate("/item/add");
    }

    const goToItemTransaction = (item: Item) => {
        dispatch(setCurrentItem(item))
        navigate(`/item/${item.id}/transaction`);
    }

    const goToEditItem = (item: Item) => {
        dispatch(setCurrentItem(item))
        navigate(`/item/${item.id}/edit`);
    }


    return (
            <Grid container columns={8}>
                <Grid item xs={8}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="sticky" className="AppBar">
                            <Toolbar>
                                <Button disabled></Button>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Food available
                                </Typography>
                                <Button disabled></Button>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </Grid>
                <Container className="container">
                    <Grid item xs={8}>
                        <List className="list-container">
                            {itemList.map(item => {
                                return <ItemRowComponent
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    barcode={item.barcode}
                                    quantity={item.availableQuantity || 0}
                                    unit={item.unit || ""}
                                    onButtonClick={() => goToEditItem(item)}
                                    onClick={() => goToItemTransaction(item)}/>
                            })}
                        </List>
                    </Grid>
                    <Fab
                        mainButtonStyles={{backgroundColor: '#1677d7'}}
                        style={{bottom: 50, right: 12}}
                        icon={<Add/>}
                        alwaysShowTitle={true}
                        event="click"
                        onClick={goToAddItem}
                    >
                    </Fab>
                </Container>
            </Grid>
    );
}
