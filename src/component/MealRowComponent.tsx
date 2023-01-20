import {MealType} from "../model/meal";
import {Edit, Restaurant} from "@mui/icons-material";
import {ListItemRowComponent} from "./ListItemRowComponent";
import {strings} from "../localization/strings";

export interface MealRowComponentProps {
    id: string
    name: string
    description: string
    mealType: MealType
    date: Date,
    kcal?: number,
    cost?: number,
    onClick: () => void
    onButtonClick: () => void
}

export const MealRowComponent = (props: MealRowComponentProps) => {

    const subtitle = props.description + (props.kcal ? `  ${props.kcal} kcal` : "") + (props.cost ? `  ${props.cost.toFixed(2)} €` : "")

    const mealTypeTranslated = (mealType: MealType) => {
        switch (mealType) {
            case MealType.BREAKFAST:
                return strings.mealTypeBreakfastLabel
            case MealType.LUNCH:
                return strings.mealTypeLunchLabel
            case MealType.DINNER:
                return strings.mealTypeDinnerLabel
            case MealType.OTHERS:
                return strings.mealTypeOtherLabel
        }
    }

    return (
            <ListItemRowComponent
                leftIcon={<Restaurant/>}
                title={props.name}
                subtitle={subtitle}
                tagList={[mealTypeTranslated(props.mealType)]}
                rightIcon={<Edit/>}
                onItemClicked={props.onClick}
                onRightIconClicked={props.onButtonClick}
            />
    );
}
