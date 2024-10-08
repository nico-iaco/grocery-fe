import {Button, Container, Grid2,} from "@mui/material";
import {TransactionDataDisplayComponent} from "./TransactionDataDisplayComponent";

export interface TransactionDataComponentProps {
    seller ?: string
    onSellerChange : (v: string) => void
    quantity ?: number
    onQuantityChange : (v: number) => void
    availableQuantity ?: number
    onAvailableQuantityChange ?: (v: number) => void
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
  return <Grid2 container columns={8} className={"text-center"}>
      <Container>
          <TransactionDataDisplayComponent
              seller={props.seller}
              onSellerChange={props.onSellerChange}
              quantity={props.quantity}
              onQuantityChange={props.onQuantityChange}
              availableQuantity={props.availableQuantity}
              onAvailableQuantityChange={props.onAvailableQuantityChange}
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
          <Grid2 size={8}>
              <Button
                  variant="contained"
                  color={"secondary"}
                  onClick={props.onButtonClick}
              >
                  {props.buttonText}
              </Button>
          </Grid2>
      </Container>
  </Grid2>
}
