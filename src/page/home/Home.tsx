import React from "react";
import {useNavigate} from "react-router-dom";
import {AppBar, Box, Button, Container, Grid, Toolbar, Typography} from "@mui/material";


export function Home() {
    const navigate = useNavigate();

    const goToMealsDashboard = () => {
        navigate("/meal");
    }

    const goToItemDashboard = () => {
        navigate(`/item`);
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
                <Container>
                    <Grid item xs={8}>
                        <Button variant="contained" onClick={goToMealsDashboard}>
                            Meals dashboard
                        </Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Button variant="contained" onClick={goToItemDashboard}>
                            Item dashboard
                        </Button>
                    </Grid>
                </Container>
            </Grid>
    );
}
