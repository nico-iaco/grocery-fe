import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAllItems, deleteItem} from "../../api/itemApis";
import {Item} from "../../model/item";
import {Button, Container, Grid, List, Typography} from "@mui/material";
import {ItemRowComponent} from "../../component/ItemRowComponent";

export function Home () {
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
        navigate("/item")
    }

    const goToItemTransaction = (id: string) => {
        navigate(`/item/${id}`)
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
        <Container maxWidth="md">
            <Grid container columns={8}>
                <Grid item xs={8}>
                    <Typography variant="h3">Food available</Typography>
                </Grid>
                <Grid item xs={8}>
                    <List>
                        {itemList.map(item => {
                            return <ItemRowComponent
                                id={item.id}
                                name={item.name}
                                barcode={item.barcode}
                                quantity={item.quantity || 0}
                                unit={item.unit || ""}
                                onButtonClick={() => deleteItemFromList(item.id)}
                                onClick={() => goToItemTransaction(item.id)} />
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
