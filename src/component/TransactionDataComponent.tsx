import {Button, Container, Grid,} from "@mui/material";
import {TransactionDataDisplayComponent} from "./TransactionDataDisplayComponent";

export interface TransactionDataComponentProps {
    seller ?: string
    onSellerChange : (v: string) => void
    quantity ?: number
    onQuantityChange : (v: number) => void
    unit ?: string
    onUnitChange : (v: string) => void
    quantityGram ?: number
    onQuantityGramChange : (v: number) => void
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
      <Container>
          <TransactionDataDisplayComponent
              seller={props.seller}
              onSellerChange={props.onSellerChange}
              quantity={props.quantity}
              onQuantityChange={props.onQuantityChange}
              unit={props.unit}
              onUnitChange={props.onUnitChange}
              quantityGram={props.quantityGram}
              onQuantityGramChange={props.onQuantityGramChange}
              price={props.price}
              onPriceChange={props.onPriceChange}
              expirationDate={props.expirationDate}
              onExpirationDateChange={props.onExpirationDateChange}
              purchaseDate={props.purchaseDate}
              onPurchaseDateChange={props.onPurchaseDateChange}
          />
          <Grid item xs={8}>
              <Button variant="contained" onClick={props.onButtonClick}>{props.buttonText}</Button>
          </Grid>
      </Container>
  </Grid>
}
