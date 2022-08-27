import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAllItems} from "../../api/itemApis";
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

    return (
        <Container maxWidth="md">
            <Grid container columns={8}>
                <Grid xs={8}>
                    <Typography variant="h3">Food available</Typography>
                </Grid>
                <Grid xs={8}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {itemList.map(item => {
                            return <ItemRowComponent
                                id={item.id}
                                name={item.name}
                                barcode={item.barcode}
                                onClick={() => goToItemTransaction(item.id)} />
                        })}
                    </List>
                </Grid>
                <Grid xs={8}>
                    <Button variant="contained" onClick={goToAddItem}>
                        Add item
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
