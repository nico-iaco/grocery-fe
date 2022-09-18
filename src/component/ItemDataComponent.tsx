import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
} from "@mui/material";
import React, {useState} from "react";
import {CameraAlt} from "@mui/icons-material";
import {BarcodeComponent} from "./BarcodeComponent";

export interface ItemDataComponentProps {
    name?: string
    onNameChange: (v: string) => void
    barcode?: string
    onBarcodeChange: (v: string) => void
    buttonText: string
    onButtonClick: () => void
}

export const ItemDataComponent = (props: ItemDataComponentProps) => {

    const [isBarcodeReaderVisible, setIsBarcodeReaderVisible] = useState(false)


    return <Grid container columns={8}>
        <Grid item xs={8}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="name-required">Name</InputLabel>
                <OutlinedInput
                    required
                    id="name-required"
                    label="Name"
                    value={props.name}
                    onChange={(event) => props.onNameChange(event.target.value)}
                />
            </FormControl>
        </Grid>
        <Grid item xs={8}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="barcode-required">Barcode</InputLabel>
                <OutlinedInput
                    required
                    id="barcode-required"
                    label="Barcode"
                    value={props.barcode}
                    onChange={(event) => props.onBarcodeChange(event.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle barcode reader modal"
                                onClick={() => setIsBarcodeReaderVisible(true)}
                                edge="end"
                            >
                                <CameraAlt/>
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Grid>
        <Grid item xs={8}>
            <Button variant="contained" onClick={props.onButtonClick}>{props.buttonText}</Button>
        </Grid>
        <Modal
            open={isBarcodeReaderVisible}
            onClose={() => setIsBarcodeReaderVisible(false)}
        >
            <Box
            >
                <BarcodeComponent
                    fps={30}
                    qrbox={480}
                    qrCodeSuccessCallback={(decodedText, result) => {
                        props.onBarcodeChange(decodedText)
                        setIsBarcodeReaderVisible(false)
                    }}
                />
            </Box>
        </Modal>
    </Grid>
}
