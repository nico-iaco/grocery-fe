import {Box, FormControl, Grid, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput} from "@mui/material";
import {CameraAlt, StoreOutlined} from "@mui/icons-material";
import {BarcodeComponent} from "./BarcodeComponent";
import {useState} from "react";

export interface ItemDataDisplayComponentProps {
    name?: string
    onNameChange: (v: string) => void
    barcode?: string
    onBarcodeChange: (v: string) => void
    vendor?: string
    onVendorChange: (v: string) => void
}

export const ItemDataDisplayComponent = (props: ItemDataDisplayComponentProps) => {
    const [isBarcodeReaderVisible, setIsBarcodeReaderVisible] = useState(false)


    return (
        <div>
            <Grid item xs={8}>
                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
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
                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
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
                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                    <InputLabel htmlFor="vendor-required">Vendor</InputLabel>
                    <OutlinedInput
                        required
                        id="vendor-required"
                        label="Vendor"
                        value={props.vendor}
                        onChange={(event) => props.onVendorChange(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <StoreOutlined/>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
            <Modal
                open={isBarcodeReaderVisible}
                onClose={() => setIsBarcodeReaderVisible(false)}
            >
                <Box>
                    <BarcodeComponent
                        fps={15}
                        qrbox={240}
                        qrCodeSuccessCallback={(decodedText, result) => {
                            props.onBarcodeChange(decodedText)
                            setIsBarcodeReaderVisible(false)
                        }}
                    />
                </Box>
            </Modal>
        </div>)

}