import {format} from "date-fns";
import {Edit, Receipt} from "@mui/icons-material";
import { ListItemRowComponent } from "./ListItemRowComponent";

export interface TransactionRowComponentProps {
    id: string
    seller: string
    quantity: number
    availableQuantity: number
    unit: string
    price: number
    expirationDate: Date
    onTransactionClick: () => void
    onTransactionButtonClick: () => void
}

export function TransactionRowComponent(props: TransactionRowComponentProps) {
    const formattedDate = format(new Date(props.expirationDate), "dd-MM-yyyy")
    return (
            <ListItemRowComponent
                leftIcon={<Receipt />}
                title={`${props.seller} ${props.price}€`}
                subtitle={`Expiration date: ${formattedDate}   ${props.availableQuantity}/${props.quantity} ${props.unit}`}
                tagList={[]}
                rightIcon={<Edit/>}
                onItemClicked={props.onTransactionClick}
                onRightIconClicked={props.onTransactionButtonClick}
            />
    );
}
