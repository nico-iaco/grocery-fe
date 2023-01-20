import {MealType} from "../model/meal";
import {strings} from "../localization/strings";

export const getTranslatedMealType = (mealType: MealType) => {
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