import {Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {strings} from "../localization/strings";

export interface LanguageSelectionDialogComponentProps {
    open: boolean;
    onClose: (value: string) => void;
    selectedValue: string;
}

const LanguageSelectionDialogComponent = (props: LanguageSelectionDialogComponentProps) => {
    const {onClose, selectedValue, open} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
            <DialogTitle id="dialog-title">{strings.languageSelectionDialogTitle}</DialogTitle>
            <List>
                <ListItem>
                    <ListItemButton onClick={() => handleListItemClick('it')} selected={'it' === selectedValue}>
                        <ListItemText primary={strings.languageSelectionItalianLabel}/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={() => handleListItemClick('en')} selected={'en' === selectedValue}>
                        <ListItemText primary={strings.languageSelectionEnglishLabel}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}

export default LanguageSelectionDialogComponent;