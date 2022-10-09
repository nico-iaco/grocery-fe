import {AvgKcalPerMealType} from "./avgKcalPerMealType";

export interface MealStatistic {
    averageWeekCalories: number;
    averageWeekCaloriesPerMealType: AvgKcalPerMealType[];
    averageWeekFoodCost: number;
    sumWeekCost: number;
}
