import {ItemStatistics} from "../model/itemStatistics";
import {Container, Grid2, List, Paper, Typography} from "@mui/material";
import {Item} from "../model/item";
import {setCurrentItem, setCurrentTabIndex} from "../action/Action";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ListItemRowComponent} from "./ListItemRowComponent";
import {HourglassBottom, ProductionQuantityLimits} from "@mui/icons-material";
import {ListLoadingComponent} from "./ListLoadingComponent";
import {strings} from "../localization/strings";

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
        <Grid2 container>
            <Grid2 size={{xs: 12, md:6}} className="container">
                <Container>
                    <Typography variant="h5" component="div">
                        <b>{strings.itemStatisticsFoodInExpirationTitle}</b>
                    </Typography>
                    <List>
                        {props.itemStatistics.itemsInExpiration ? props.itemStatistics.itemsInExpiration.map(item => {
                            const formattedDateString = new Date(item.nextExpirationDate || "").toLocaleDateString();
                            return <ListItemRowComponent
                                key={item.id}
                                leftIcon={<HourglassBottom color="warning"/>}
                                title={item.name}
                                subtitle={formattedDateString}
                                tagList={[]}
                                onItemClicked={() => goToItemTransactionPage(item)}
                            />
                        }) : <ListLoadingComponent listItemNumber={3} />}
                    </List>
                </Container>
            </Grid2>
            <Grid2 size={{xs: 12, md:6}} className="container">
                <Container>
                    <Typography variant="h5" component="div">
                        <b>{strings.itemStatisticsFoodAlmostFinishedTitle}</b>
                    </Typography>
                    <List>
                        {props.itemStatistics.itemsAlmostFinished ? props.itemStatistics.itemsAlmostFinished.map(item => {
                            return <ListItemRowComponent
                                key={item.id}
                                leftIcon={<ProductionQuantityLimits color="warning"/>}
                                title={item.name}
                                subtitle={`${item.availableQuantity} ${item.unit}`}
                                tagList={[]}
                                onItemClicked={() => goToItemTransactionPage(item)}
                            />
                        }) : <ListLoadingComponent listItemNumber={3} />}
                    </List>
                </Container>
            </Grid2>
        </Grid2>
    </Paper>;
}
