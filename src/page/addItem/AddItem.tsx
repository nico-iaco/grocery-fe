import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Item} from "../../model/item";
import {addItem} from "../../api/itemApis";
import {AppBar, Box, Button, Container, Grid, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

export function AddItem () {
    const [name, setName] = useState("");
    const [barcode, setBarcode] = useState("");
    const navigate = useNavigate();
    const sendItemToBe = () => {
      const item: Item = {
          id: "",
          name,
          barcode
      };
      addItem(item)
          .then(value => {
              console.log(value);
              navigate("/")
          })
          .catch(reason => console.error(reason));
    };

    const goBack = () => {
        navigate(`/`);
    }

    return (
        <Container>
            <Grid container columns={8} sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>
                <Grid item xs={8}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                    onClick={goBack}
                                >
                                    <ArrowBack />
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Add food
                                </Typography>
                                <Button disabled></Button>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Barcode"
                        value={barcode}
                        onChange={(event) => setBarcode(event.target.value)}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button variant="contained" onClick={() => sendItemToBe()}>Add food</Button>
                </Grid>
            </Grid>

        </Container>
    );
}
