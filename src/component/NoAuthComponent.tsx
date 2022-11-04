import {AppBar, Box, Button, Container, Grid, Toolbar, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

export const NoAuthComponent = () => {
    const navigate = useNavigate();

    const login = () => {
        navigate(`/signin`);
    }

    const register = () => {
        navigate(`/signup`);
    }

    return (
        <Grid container columns={8}>
            <Grid item xs={8}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="sticky" className="AppBar">
                        <Toolbar>
                            <Button disabled></Button>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Foody
                            </Typography>
                            <Button disabled></Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Container className="container">
                <Grid item xs={8} className="container">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        You are not logged in.
                    </Typography>
                </Grid>
                <Grid item xs={8} className="container">
                    <Button variant="contained" onClick={register}>Register</Button>
                </Grid>
                <Grid item xs={8} className="container">
                    <Button variant="contained" onClick={login}>Login</Button>
                </Grid>
            </Container>
        </Grid>
    );
}
