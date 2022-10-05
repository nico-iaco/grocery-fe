import {Item} from "../model/item";
import {Transaction} from "../model/transaction";
import {Meal} from "../model/meal";

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

export const setCurrentFoodConsumption = (foodConsumption?: any): Action => {
    return {
        type: SET_CURRENT_FOOD_CONSUMPTION_TYPE,
        payload: foodConsumption
    };
}

export const updateFoodConsumptionToState = (foodConsumption: any): Action => {
    return {
        type: UPDATE_CURRENT_FOOD_CONSUMPTION_TYPE,
        payload: foodConsumption
    };
}

