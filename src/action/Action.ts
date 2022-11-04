import {Item} from "../model/item";
import {Transaction} from "../model/transaction";
import {Meal} from "../model/meal";
import {FoodConsumption} from "../model/foodConsumption";
import {User} from "../model/user";

export interface Action {
    type: string;
    payload?: any;
}

export const SET_CURRENT_ITEM_TYPE = "SET_CURRENT_ITEM";
export const UPDATE_CURRENT_ITEM_TYPE = "UPDATE_CURRENT_ITEM";

export const SET_CURRENT_TRANSACTION_TYPE = "SET_CURRENT_TRANSACTION";
export const UPDATE_CURRENT_TRANSACTION_TYPE = "UPDATE_CURRENT_TRANSACTION";

export const SET_CURRENT_MEAL_TYPE = "SET_CURRENT_MEAL";
export const UPDATE_CURRENT_MEAL_TYPE = "UPDATE_CURRENT_MEAL";

export const SET_CURRENT_FOOD_CONSUMPTION_TYPE = "SET_CURRENT_FOOD_CONSUMPTION";
export const UPDATE_CURRENT_FOOD_CONSUMPTION_TYPE = "UPDATE_CURRENT_FOOD_CONSUMPTION";

export const SET_CURRENT_TAB_INDEX_TYPE = "SET_CURRENT_TAB_INDEX";

export const SET_ERROR_TYPE = "SET_ERROR";
export const CLEAR_ERROR_TYPE = "CLEAR_ERROR";

export const SET_USER_TYPE = "SET_USER";
export const CLEAR_USER_TYPE = "CLEAR_USER";


export const setCurrentItem = (item?: Item): Action => {
    return {
        type: SET_CURRENT_ITEM_TYPE,
        payload: item
    };
}

export const updateItemToState = (item: Item): Action => {
    return {
        type: UPDATE_CURRENT_ITEM_TYPE,
        payload: item
    };
}

export const setCurrentTransaction = (transaction?: Transaction): Action => {
    return {
        type: SET_CURRENT_TRANSACTION_TYPE,
        payload: transaction
    };
}

export const updateTransactionToState = (transaction: Transaction): Action => {
    return {
        type: UPDATE_CURRENT_TRANSACTION_TYPE,
        payload: transaction
    };
}

export const setCurrentMeal = (meal?: Meal): Action => {
    return {
        type: SET_CURRENT_MEAL_TYPE,
        payload: meal
    };
}

export const updateMealToState = (meal: Meal): Action => {
    return {
        type: UPDATE_CURRENT_MEAL_TYPE,
        payload: meal
    };
}

export const setCurrentFoodConsumption = (foodConsumption?: FoodConsumption): Action => {
    return {
        type: SET_CURRENT_FOOD_CONSUMPTION_TYPE,
        payload: foodConsumption
    };
}

export const updateFoodConsumptionToState = (foodConsumption: FoodConsumption): Action => {
    return {
        type: UPDATE_CURRENT_FOOD_CONSUMPTION_TYPE,
        payload: foodConsumption
    };
}

export const setCurrentTabIndex = (index: number): Action => {
    return {
        type: SET_CURRENT_TAB_INDEX_TYPE,
        payload: index
    };
}

export const setError = (error: string): Action => {
    return {
        type: SET_ERROR_TYPE,
        payload: error
    };
}

export const clearError = (): Action => {
    return {
        type: CLEAR_ERROR_TYPE
    };
}

export const setUser = (user: User): Action => {
    return {
        type: SET_USER_TYPE,
        payload: user
    };
}

export const clearUser = (): Action => {
    return {
        type: CLEAR_USER_TYPE
    };
}

