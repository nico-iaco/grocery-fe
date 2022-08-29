import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Item} from "../../model/item";
import {addItem} from "../../api/itemApis";
import {Button, Container, Grid, TextField, Typography} from "@mui/material";

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
    return (
        <Container maxWidth="md">
            <Grid container columns={8} sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>
                <Grid item xs={8}>
                    <Typography variant="h2">Add food</Typography>
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
