import {Edit, Fastfood} from "@mui/icons-material";
import { ListItemRowComponent } from "./ListItemRowComponent";


export interface ItemRowComponentProps {
    id: string
    name: string
    barcode: string,
    quantity: number
    unit: string
    onClick: () => void
    onButtonClick: () => void
}

export function ItemRowComponent(props: ItemRowComponentProps) {
    return (
        <ListItemRowComponent
            leftIcon={<Fastfood/>}
            title={props.name}
            subtitle={`${props.barcode}   ${props.quantity} ${props.unit}`}
            tagList={[]}
            rightIcon={<Edit/>}
            onItemClicked={props.onClick}
            onRightIconClicked={props.onButtonClick}
        />
    );
}
