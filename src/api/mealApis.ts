import axios from "axios";
import {BaseResponse} from "../model/baseResponse";
import {Meal} from "../model/meal";
import {FoodConsumption} from "../model/foodConsumption";
import {MealStatistic} from "../model/mealStatistic";
import {format} from "date-fns";
import {getFirebaseUserToken} from "../utils/firebaseUtils";


export const baseUrl = process.env.REACT_APP_BASE_URL_FT;

export const addMeal = async (meal: Meal, controller: AbortController) => {
    const url = `${baseUrl}/meal/`;
    const token = await getFirebaseUserToken();
    const axiosResponse = await axios.post(
        url,
        meal,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            signal: controller.signal,
        }
    );
    const baseResponse: BaseResponse<Meal> = axiosResponse.data;
    return baseResponse.body;
}

export const getAllMeals = async (controller: AbortController) => {
    const url = `${baseUrl}/meal/`;
    const token = await getFirebaseUserToken();
    const axiosResponse = await axios.get(
        url,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
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
    const token = await getFirebaseUserToken();
    const axiosResponse = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
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
    const token = await getFirebaseUserToken();
    const axiosResponse = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
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
    const token = await getFirebaseUserToken();
    const url = `${baseUrl}/meal/statistics/?startRange=${formattedStartDate}&endRange=${formattedEndDate}`;
    const axiosResponse = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
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
    const token = await getFirebaseUserToken();
    const axiosResponse = await axios.patch(url, meal, {
        headers: {
            "Authorization": `Bearer ${token}`
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
    const token = await getFirebaseUserToken();
    const axiosResponse = await axios.delete(url, {
        headers: {
            "Authorization": `Bearer ${token}`
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
    const token = await getFirebaseUserToken();
    const axiosResponse = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
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
    const token = await getFirebaseUserToken();
    const axiosResponse = await axios.post(
        url,
        foodConsumption,
        {
            headers: {
                "Authorization": `Bearer ${token}`
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
    const token = await getFirebaseUserToken();
    const axiosResponse = await axios.patch(url, foodConsumption, {
        headers: {
            "Authorization": `Bearer ${token}`
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
    const token = await getFirebaseUserToken();
    const url = `${baseUrl}/meal/${mealId}/consumption/${foodConsumptionId}/`;
    const axiosResponse = await axios.delete(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<string> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}


