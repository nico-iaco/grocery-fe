import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {TransactionDataComponent} from "../../component/TransactionDataComponent";
import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getItemTransaction, updateItemTransaction} from "../../api/itemApis";
import {Transaction} from "../../model/transaction";

export const EditTransactionPage = () => {
  const { itemId, itemName, transactionId } = useParams();
  const [vendor, setVendor] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [unit, setUnit] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [expirationDate, setExpirationDate] = React.useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    getItemTransaction(itemId || "", transactionId || "")
        .then(value => {
            setVendor(value.vendor);
            setQuantity(value.quantity);
            setUnit(value.unit);
            setPrice(value.price);
            setExpirationDate(value.expirationDate);
        })
        .catch(reason => console.error(reason));
  }, [itemId, transactionId]);

  const goBack = () => {
    navigate(`/item/${itemId}/${itemName}`);
  }

  const updateTransactionToBe = () => {
    const updatedTransaction: Transaction = {
      id: transactionId || "",
      vendor,
      quantity,
      availableQuantity: quantity,
      unit,
      price,
      expirationDate
    }

    updateItemTransaction(itemId || "", updatedTransaction)
        .then(value => {
            console.log(value);
            goBack();
        })
        .catch(reason => console.error(reason));
  }

  return <Container>
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
                Edit transaction
              </Typography>
              <Button disabled></Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <TransactionDataComponent
          vendor={vendor}
          onVendorChange={setVendor}
          quantity={quantity}
          onQuantityChange={setQuantity}
          unit={unit}
          onUnitChange={setUnit}
          price={price}
          onPriceChange={setPrice}
          expirationDate={expirationDate}
          onExpirationDateChange={setExpirationDate}
          buttonText="Update"
          onButtonClick={updateTransactionToBe} />
    </Grid>
  </Container>
}
