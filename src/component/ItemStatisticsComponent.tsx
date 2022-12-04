import {ItemStatistics} from "../model/itemStatistics";
import {Container, Grid, List, Paper, Skeleton, Stack, Typography} from "@mui/material";
import {SimpleItemRowComponent} from "./SimpleItemRowComponent";
import {Item} from "../model/item";
import {setCurrentItem, setCurrentTabIndex} from "../action/Action";
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
        dispatch(setCurrentTabIndex(2));
        navigate(`/item/${item.id}/transaction`);
    }


    return <Paper>
        <Grid container>
            <Grid item xs={12} md={6} className="container">
                <Container>
                    <Typography variant="h5" component="div">
                        <b>Food in expiration</b>
                    </Typography>
                    <List>
                        {props.itemStatistics.itemsInExpiration ? props.itemStatistics.itemsInExpiration.map(item => {
                            const formattedDateString = new Date(item.nextExpirationDate || "").toLocaleDateString();
                            return <Paper key={item.id} variant="outlined" className="list-item">
                                <Grid container columns={8}>
                                    <SimpleItemRowComponent
                                        mainText={item.name}
                                        subText={formattedDateString}
                                        onClick={() => goToItemTransactionPage(item)}/>
                                </Grid>
                            </Paper>
                        }) : <Stack spacing={1}>
                            <Skeleton variant="rectangular" height={80}/>
                            <Skeleton variant="rectangular" height={80}/>
                            <Skeleton variant="rectangular" height={80}/>
                        </Stack>}
                    </List>
                </Container>
            </Grid>
            <Grid item xs={12} md={6} className="container">
                <Container>
                    <Typography variant="h5" component="div">
                        <b>Food almost finished</b>
                    </Typography>
                    <List>
                        {props.itemStatistics.itemsAlmostFinished ? props.itemStatistics.itemsAlmostFinished.map(item => {
                            return <Paper key={item.id} variant="outlined" className="list-item">
                                <SimpleItemRowComponent
                                    mainText={item.name}
                                    subText={item.availableQuantity + " " + item.unit}
                                    onClick={() => goToItemTransactionPage(item)}/>
                            </Paper>
                        }) : <Stack spacing={1}>
                            <Skeleton variant="rectangular" height={80}/>
                            <Skeleton variant="rectangular" height={80}/>
                            <Skeleton variant="rectangular" height={80}/>
                        </Stack>}
                    </List>
                </Container>
            </Grid>
        </Grid>
    </Paper>;
}
