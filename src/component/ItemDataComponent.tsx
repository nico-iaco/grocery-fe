import {Button, Container, Grid2,} from "@mui/material";
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

    return <Grid2 container columns={8} className={"text-center"}>
        <Container>
            <ItemDataDisplayComponent
                onNameChange={props.onNameChange}
                onBarcodeChange={props.onBarcodeChange}
                onVendorChange={props.onVendorChange}
                name={props.name}
                barcode={props.barcode}
                vendor={props.vendor}
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
