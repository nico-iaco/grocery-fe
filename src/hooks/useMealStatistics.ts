import {useEffect, useState} from "react";
import {MealStatistic} from "../model/mealStatistic";
import {getMealStatistics, getMealStatisticsInDateRange} from "../api/mealApis";
import {setError} from "../action/Action";
import {useDispatch} from "react-redux";

export const useMealStatistics = (userId: string, startRange?: Date, endRange?: Date) => {
    const initialStatistics: MealStatistic = {
        averageWeekFoodCost: 0,
        sumWeekCost: 0,
        averageWeekCalories: 0,
        averageWeekCaloriesPerMealType: [],
        mostConsumedFood: {
            foodName: "",
            foodId: "",
            quantityUsed: 0,
            unit: "",
            quantityUsedStd: 0,
        }
    }

    const [mealStatistics, setMealStatistics] = useState<MealStatistic>(initialStatistics);

    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();
        if (endRange && startRange) {
            getMealStatisticsInDateRange(startRange, endRange, userId, controller)
                .then(value => {
                    if (value) {
                        setMealStatistics(value)
                    }
                })
                .catch(reason => {
                    console.error(reason)
                    dispatch(setError(reason.message))
                });
        } else {
            getMealStatistics(userId || "", controller)
                .then(value => {
                    if (value) {
                        setMealStatistics(value);
                    }
                })
                .catch(reason => {
                    console.error(reason)
                    dispatch(setError(reason.message))
                });
        }
        return () => {
            controller.abort();
        }
    }, [startRange, endRange]);

    return mealStatistics;
}