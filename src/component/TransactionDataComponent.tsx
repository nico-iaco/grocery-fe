import {Button, Grid, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

export interface TransactionDataComponentProps {
    seller ?: string
    onSellerChange : (v: string) => void
    quantity ?: number
    onQuantityChange : (v: number) => void
    unit ?: string
    onUnitChange : (v: string) => void
    price ?: number
    onPriceChange : (v: number) => void
    expirationDate ?: Date
    onExpirationDateChange : (v: Date) => void
    purchaseDate ?: Date
    onPurchaseDateChange : (v: Date) => void
    buttonText : string
    onButtonClick : () => void
}

export const TransactionDataComponent = (props: TransactionDataComponentProps) => {
  return <Grid container columns={8}>
      <Grid item xs={8}>
          <TextField
              required
              id="outlined"
              label="Vendor"
              value={props.seller}
              onChange={(event) => props.onSellerChange(event.target.value)}
          />
      </Grid>
      <Grid item xs={8}>
          <TextField
              required
              id="outlined"
              label="Quantity"
              type="number"
              value={props.quantity}
              onChange={(event) => props.onQuantityChange(Number.parseFloat(event.target.value))}
          />
      </Grid>
      <Grid item xs={8}>
          <TextField
              required
              id="outlined"
              label="Unit"
              value={props.unit}
              onChange={(event) => props.onUnitChange(event.target.value)}
          />
      </Grid>
      <Grid item xs={8}>
          <TextField
              required
              id="outlined"
              label="Price"
              type="number"
              value={props.price}
              onChange={(event) => props.onPriceChange(Number.parseFloat(event.target.value))}
          />
      </Grid>
      <Grid item xs={8}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                  label="Expiration date"
                  value={props.expirationDate}
                  minDate={new Date()}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => {
                      if (newValue !== null) {
                          props.onExpirationDateChange(new Date(newValue));
                      }
                  }}
                  renderInput={(params) => <TextField {...params} />}
              />
          </LocalizationProvider>
      </Grid>
      <Grid item xs={8}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                  label="Purchase date"
                  value={props.purchaseDate}
                  minDate={new Date()}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => {
                      if (newValue !== null) {
                          props.onPurchaseDateChange(new Date(newValue));
                      }
                  }}
                  renderInput={(params) => <TextField {...params} />}
              />
          </LocalizationProvider>
      </Grid>
      <Grid item xs={8}>
          <Button variant="contained" onClick={props.onButtonClick}>{props.buttonText}</Button>
      </Grid>
  </Grid>
}
