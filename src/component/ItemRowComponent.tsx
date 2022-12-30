import {Edit} from "@mui/icons-material";
import {SimpleItemWithButtonComponent} from "./SimpleItemWithButtonComponent";


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
        <SimpleItemWithButtonComponent
            mainText={props.name}
            subText={`${props.barcode}   ${props.quantity} ${props.unit}`}
            onItemClicked={props.onClick}
            icon={<Edit/>}
            onButtonClicked={props.onButtonClick}
        />
    );
}
