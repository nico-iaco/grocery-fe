import {format} from "date-fns";
import {Edit, Receipt} from "@mui/icons-material";
import {ListItemRowComponent} from "./ListItemRowComponent";
import {strings} from "../localization/strings";

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
                subtitle={strings.formatString(strings.transactionRowSubtitle, formattedDate, props.availableQuantity.toString(), props.quantity.toString(), props.unit).toString()}
                tagList={[]}
                rightIcon={<Edit/>}
                onItemClicked={props.onTransactionClick}
                onRightIconClicked={props.onTransactionButtonClick}
            />
    );
}
