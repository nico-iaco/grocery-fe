import {Edit} from "@mui/icons-material";
import { ListItemRowComponent } from "./ListItemRowComponent";

export interface FoodConsumptionRowComponentProps {
    foodName: string;
    quantityUsed: number;
    unit: string;
    kcal: number;
    onItemClicked: () => void;
    onButtonClicked: () => void;
}

export const FoodConsumptionRowComponent = (props: FoodConsumptionRowComponentProps) => {
    return (
        <ListItemRowComponent
            leftIcon={<Edit/>}
            title={props.foodName}
            subtitle={`${props.quantityUsed} ${props.unit}  ${props.kcal} kcal`}
            tagList={[]}
            rightIcon={<Edit/>}
            onItemClicked={props.onItemClicked}
            onRightIconClicked={props.onButtonClicked}
        />);

}
