import {AvgKcalPerMealType} from "./avgKcalPerMealType";
import {MostConsumedFood} from "./mostConsumedFood";

export interface MealStatistic {
    averageWeekCalories: number;
    averageWeekCaloriesPerMealType: AvgKcalPerMealType[];
    averageWeekFoodCost: number;
    sumWeekCost: number;
    mostConsumedFood: MostConsumedFood;
}
