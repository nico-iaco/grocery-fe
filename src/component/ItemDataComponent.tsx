import {Button, Container, Grid,} from "@mui/material";
import {ItemDataDisplayComponent} from "./ItemDataDisplayComponent";

export interface ItemDataComponentProps {
    name?: string
    onNameChange: (v: string) => void
    barcode?: string
    onBarcodeChange: (v: string) => void
    vendor?: string
    onVendorChange: (v: string) => void
    buttonText: string
    onButtonClick: () => void
}

export const ItemDataComponent = (props: ItemDataComponentProps) => {

    return <Grid container columns={8} className={"text-center"}>
        <Container>
            <ItemDataDisplayComponent
                onNameChange={props.onNameChange}
                onBarcodeChange={props.onBarcodeChange}
                onVendorChange={props.onVendorChange}
                name={props.name}
                barcode={props.barcode}
                vendor={props.vendor}
            />
            <Grid item xs={8}>
                <Button
                    variant="contained"
                    color={"secondary"}
                    onClick={props.onButtonClick}
                >
                    {props.buttonText}
                </Button>
            </Grid>
        </Container>
    </Grid>
}
