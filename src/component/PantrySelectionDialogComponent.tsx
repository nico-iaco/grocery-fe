import {Dialog, DialogTitle, Divider, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {strings} from "../localization/strings";
import {usePantryList} from "../hooks/usePantryList";
import {Pantry} from "../model/pantry";
import {useNavigate} from "react-router-dom";

export interface PantrySelectionDialogComponentProps {
    open: boolean;
    onClose: (value: Pantry | undefined) => void;
    selectedValue: Pantry | undefined;
}

const PantrySelectionDialogComponent = (props: PantrySelectionDialogComponentProps) => {
    const {onClose, selectedValue, open} = props;

    const navigate = useNavigate();

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: Pantry) => {
        onClose(value);
    };

    const handleCreatePantry = () => {
        navigate("/pantry/add");
    }

    const handleImportPantry = () => {
        navigate("/pantry/import");
    }

    const pantryList = usePantryList();
    console.log(pantryList);

    return (
        <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
            <DialogTitle id="dialog-title">{strings.pantrySelectionDialogTitle}</DialogTitle>
            <List>
                {
                    pantryList.map((pantry) => {
                        return <ListItem key={pantry.id}>
                            <ListItemButton onClick={() => handleListItemClick(pantry)}
                                            selected={pantry?.name === selectedValue?.name}>
                                <ListItemText primary={pantry.name}/>
                            </ListItemButton>
                        </ListItem>
                    })
                }
                <Divider />
                <ListItem>
                    <ListItemButton onClick={handleCreatePantry}>
                        <ListItemText primary={strings.createPantryDialogLabel}/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={handleImportPantry}>
                        <ListItemText primary={strings.importPantryDialogLabel}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}

export default PantrySelectionDialogComponent;