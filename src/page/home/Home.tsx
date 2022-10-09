import React from "react";
import {useNavigate} from "react-router-dom";
import {
    AppBar,
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Toolbar,
    Typography
} from "@mui/material";
import {Action, Fab} from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import {Add, Fastfood, LocalGroceryStore} from "@mui/icons-material";


export function Home() {
    const navigate = useNavigate();

    const goToMealsDashboard = () => {
        navigate("/meal");
    }

    const goToItemDashboard = () => {
        navigate(`/item`);
    }

    const goToAddFood = () => {
        navigate(`/item/add`);
    }

    const goToAddMeal = () => {
        navigate(`/meal/add`);
    }


    return (
            <Grid container columns={8}>
                <Grid item xs={8}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="sticky" className="AppBar">
                            <Toolbar>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Home
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </Grid>
                <Container className="container">
                    <Grid item xs={8} className="container">
                        <Card sx={{ maxWidth: 360 }} onClick={goToMealsDashboard} className={"horizontally-center"}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image="https://dhqbz5vfue3y3.cloudfront.net/fotomondobb/2006_top.jpg"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Meals dashboard
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={8} className="container">
                        <Card sx={{ maxWidth: 360 }} onClick={goToItemDashboard} className={"horizontally-center"}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image="https://hips.hearstapps.com/hmg-prod/images/healthy-groceries-1525213305.jpg"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Grocery dashboard
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Fab
                        mainButtonStyles={{ backgroundColor: '#1677d7' }}
                        icon={<Add />}
                        alwaysShowTitle={true}
                    >
                        <Action
                            style={{ backgroundColor: '#1677d7' }}
                            text="Add meal"
                            onClick={goToAddMeal}
                        >
                            <Fastfood />
                        </Action>
                        <Action
                            style={{ backgroundColor: '#1677d7' }}
                            text="Add food"
                            onClick={goToAddFood}
                        >
                            <LocalGroceryStore />
                        </Action>
                    </Fab>
                </Container>
            </Grid>
    );
}
