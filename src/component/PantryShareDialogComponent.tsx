import {Dialog, DialogTitle} from "@mui/material";
import {strings} from "../localization/strings";
import QRCode from "react-qr-code";

export interface PantryShareDialogComponentProps {
    open: boolean;
    onClose: () => void;
    pantryId: string;
}

const PantryShareDialogComponent = (props: PantryShareDialogComponentProps) => {
    const {onClose, pantryId, open} = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
            <DialogTitle id="dialog-title">{strings.pantryShareDialogTitle}</DialogTitle>
            <div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>
                <QRCode
                    size={256}
                    style={{height: "auto", maxWidth: "100%", width: "100%"}}
                    value={pantryId}
                    viewBox={`0 0 256 256`}
                />
            </div>
            <br/>
        </Dialog>
    );
}

export default PantryShareDialogComponent;