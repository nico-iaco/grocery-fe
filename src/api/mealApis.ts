import axios from "axios";
import {BaseResponse} from "../model/baseResponse";
import {Meal} from "../model/meal";
import {FoodConsumption} from "../model/foodConsumption";
import {MealStatistic} from "../model/mealStatistic";
import {format} from "date-fns";


export const baseUrl = process.env.REACT_APP_BASE_URL_FT;

export const addMeal = async (meal: Meal, controller: AbortController) => {
    const url = `${baseUrl}/meal/`;
    const axiosResponse = await axios.post(
        url,
        meal,
        {
            signal: controller.signal,
        }
    );
    const baseResponse: BaseResponse<Meal> = axiosResponse.data;
    return baseResponse.body;
}

export const getAllMeals = async (controller: AbortController) => {
    const url = `${baseUrl}/meal/`;
    const axiosResponse = await axios.get(
        url,
        {
            signal: controller.signal,
        }
    );
    const baseResponse: BaseResponse<Meal[]> = axiosResponse.data;
    return baseResponse.body;
}

export const getAllMealInDateRange = async (startDate: Date, endDate: Date, userid: string, controller: AbortController) => {
    const formattedStartDate = format(new Date(startDate), "dd-MM-yyyy")
    const formattedEndDate = format(new Date(endDate), "dd-MM-yyyy")
    const url = `${baseUrl}/meal/?startRange=${formattedStartDate}&endRange=${formattedEndDate}`;
    const axiosResponse = await axios.get(url, {
        headers: {
            "iv-user": userid
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<Meal[]> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const getMealStatistics = async (userid: string, controller: AbortController) => {
    const url = `${baseUrl}/meal/statistics/`;
    const axiosResponse = await axios.get(url, {
        headers: {
            "iv-user": userid
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<MealStatistic> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const getMealStatisticsInDateRange = async (startDate: Date, endDate: Date, userid: string, controller: AbortController) => {
    const formattedStartDate = format(new Date(startDate), "dd-MM-yyyy")
    const formattedEndDate = format(new Date(endDate), "dd-MM-yyyy")
    const url = `${baseUrl}/meal/statistics/?startRange=${formattedStartDate}&endRange=${formattedEndDate}`;
    const axiosResponse = await axios.get(url, {
        headers: {
            "iv-user": userid
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<MealStatistic> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const updateMeal = async (meal: Meal, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/meal/${meal.id}/`;
    const axiosResponse = await axios.patch(url, meal, {
        headers: {
            "iv-user": userid
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<Meal> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const deleteMeal = async (id: string, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/meal/${id}/`;
    const axiosResponse = await axios.delete(url, {
        headers: {
            "iv-user": userid
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<string> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const getMealFoodConsumptions = async (mealId: string, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/meal/${mealId}/consumption/`;
    const axiosResponse = await axios.get(url, {
        headers: {
            "iv-user": userid
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<FoodConsumption[]> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const addMealFoodConsumption = async (mealId: string, foodConsumption: FoodConsumption, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/meal/${mealId}/consumption/`;
    const axiosResponse = await axios.post(
        url,
        foodConsumption,
        {
            headers: {
                "iv-user": userid
            },
            signal: controller.signal,
        }
    );
    const baseResponse: BaseResponse<FoodConsumption> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const updateMealFoodConsumption = async (mealId: string, foodConsumption: FoodConsumption, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/meal/${mealId}/consumption/${foodConsumption.id}/`;
    const axiosResponse = await axios.patch(url, foodConsumption, {
        headers: {
            "iv-user": userid
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<FoodConsumption> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const deleteMealFoodConsumption = async (mealId: string, foodConsumptionId: string, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/meal/${mealId}/consumption/${foodConsumptionId}/`;
    const axiosResponse = await axios.delete(url, {
        headers: {
            "iv-user": userid
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<string> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}


