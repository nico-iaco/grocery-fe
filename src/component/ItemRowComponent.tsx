import {ListItem, ListItemText} from "@mui/material";

export interface ItemRowComponentProps {
    id: string
    name: string
    barcode: string
    onClick: () => void
}

export function ItemRowComponent(props: ItemRowComponentProps) {
    return (
        <ListItem onClick={props.onClick} key={props.id}>
            <ListItemText
                primary={props.name}
                secondary={props.barcode}
            />
        </ListItem>
    );
}
