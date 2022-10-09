import {ItemStatistics} from "../model/itemStatistics";
import {Container, Grid, List, Paper, Typography} from "@mui/material";
import {SimpleItemRowComponent} from "./SimpleItemRowComponent";
import React from "react";
import {Item} from "../model/item";
import {setCurrentItem} from "../action/Action";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export interface ItemStatisticsComponentProps {
    itemStatistics: ItemStatistics
}

export const ItemStatisticsComponent = (props: ItemStatisticsComponentProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const goToItemTransactionPage = (item: Item) => {
        dispatch(setCurrentItem(item));
        navigate(`/item/${item.id}/transaction`);
    }


    return <Paper>
        <Grid container>
            <Grid item xs={12} md={6} className="container">
                <Container>
                    <Typography variant="h5" component="div">
                        Food in expiration
                    </Typography>
                    <List>
                        {props.itemStatistics.itemsInExpiration ? props.itemStatistics.itemsInExpiration.map(item => {
                            return <Paper key={item.id} variant="outlined" className="list-item">
                                <Grid container columns={8}>
                                    <SimpleItemRowComponent
                                        mainText={item.name}
                                        subText={item.barcode}
                                        onClick={() => goToItemTransactionPage(item)}/>
                                </Grid>
                            </Paper>
                        }) : <div></div>}
                    </List>
                </Container>
            </Grid>
            <Grid item xs={12} md={6} className="container">
                <Container>
                    <Typography variant="h5" component="div">
                        Food almost finished
                    </Typography>
                    <List>
                        {props.itemStatistics.itemsAlmostFinished ? props.itemStatistics.itemsAlmostFinished.map(item => {
                            return <Paper key={item.id} variant="outlined" className="list-item">
                                <SimpleItemRowComponent
                                    mainText={item.name}
                                    subText={item.availableQuantity + " " + item.unit}
                                    onClick={() => goToItemTransactionPage(item)}/>
                            </Paper>
                        }) : <div></div>}
                    </List>
                </Container>
            </Grid>
        </Grid>
    </Paper>;
}
