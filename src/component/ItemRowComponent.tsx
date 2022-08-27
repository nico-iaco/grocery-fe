import {IconButton, ListItem, ListItemText} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export interface ItemRowComponentProps {
    id: string
    name: string
    barcode: string
    onClick: () => void
    onButtonClick: () => void
}

export function ItemRowComponent(props: ItemRowComponentProps) {
    return (
        <ListItem
            key={props.id}
            secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={props.onButtonClick}>
                <DeleteIcon />
            </IconButton>}>
            <ListItemText
                onClick={props.onClick}
                primary={props.name}
                secondary={props.barcode}
            />
        </ListItem>
    );
}
