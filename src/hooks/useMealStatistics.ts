import {useEffect, useState} from "react";
import {MealStatistic} from "../model/mealStatistic";
import {getMealStatistics, getMealStatisticsInDateRange} from "../api/mealApis";
import {setError} from "../action/Action";
import {useDispatch} from "react-redux";

export const useMealStatistics = (startRange?: Date, endRange?: Date) => {
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
            getMealStatisticsInDateRange(startRange, endRange, controller)
                .then(value => {
                    if (value) {
                        setMealStatistics(value)
                    }
                })
                .catch(reason => {
                    console.error(reason)
                    dispatch(setError(reason.message))
                    setMealStatistics(initialStatistics)
                });
        } else {
            getMealStatistics(controller)
                .then(value => {
                    if (value) {
                        setMealStatistics(value);
                    }
                })
                .catch(reason => {
                    console.error(reason)
                    dispatch(setError(reason.message))
                    setMealStatistics(initialStatistics)
                });
        }
        return () => {
            controller.abort();
        }
    }, [startRange, endRange]);

    return mealStatistics;
}