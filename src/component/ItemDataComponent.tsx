import {Button, Grid, TextField} from "@mui/material";
import React from "react";

export interface ItemDataComponentProps {
    name ?: string
    onNameChange : (v: string) => void
    barcode ?: string
    onBarcodeChange : (v: string) => void
    buttonText : string
    onButtonClick : () => void
}

export const ItemDataComponent = (props: ItemDataComponentProps) => {
  return <Grid container columns={8}>
      <Grid item xs={8}>
          <TextField
              required
              id="outlined-required"
              label="Name"
              value={props.name}
              onChange={(event) => props.onNameChange(event.target.value)}
          />
      </Grid>
      <Grid item xs={8}>
          <TextField
              required
              id="outlined-required"
              label="Barcode"
              value={props.barcode}
              onChange={(event) => props.onBarcodeChange(event.target.value)}
          />
      </Grid>
      <Grid item xs={8}>
          <Button variant="contained" onClick={props.onButtonClick}>{props.buttonText}</Button>
      </Grid>
  </Grid>
}
