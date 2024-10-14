import {Item} from "../model/item";
import {Transaction} from "../model/transaction";
import {Meal} from "../model/meal";
import {FoodConsumption} from "../model/foodConsumption";
import {User} from "../model/user";
import {ShoppingItem} from "../model/shoppingItem";
import {UnknownAction} from "redux";
import {Pantry} from "../model/pantry";

export interface CustomAction extends UnknownAction{
    payload?: any;
}

export const SET_CURRENT_PANTRY_TYPE = "SET_CURRENT_PANTRY";

export const SET_CURRENT_ITEM_TYPE = "SET_CURRENT_ITEM";

export const SET_CURRENT_TRANSACTION_TYPE = "SET_CURRENT_TRANSACTION";

export const SET_CURRENT_MEAL_TYPE = "SET_CURRENT_MEAL";

export const SET_CURRENT_FOOD_CONSUMPTION_TYPE = "SET_CURRENT_FOOD_CONSUMPTION";

export const SET_CURRENT_TAB_INDEX_TYPE = "SET_CURRENT_TAB_INDEX";

export const SET_ERROR_TYPE = "SET_ERROR";
export const CLEAR_ERROR_TYPE = "CLEAR_ERROR";

export const SET_USER_TYPE = "SET_USER";
export const CLEAR_USER_TYPE = "CLEAR_USER";

export const ADD_TO_SHOPPING_LIST_TYPE = "ADD_TO_SHOPPING_LIST";
export const REMOVE_FROM_SHOPPING_LIST_TYPE = "REMOVE_FROM_SHOPPING_LIST";
export const UPDATE_SHOPPING_LIST_TYPE = "UPDATE_SHOPPING_LIST";
export const CLEAR_SHOPPING_LIST_TYPE = "CLEAR_SHOPPING_LIST";

export const SET_CURRENT_SHOPPING_ITEM_TYPE = "SET_CURRENT_SHOPPING_ITEM";

export const SET_CURRENT_MEAL_DATE_TYPE = "SET_CURRENT_MEAL_DATE";

export const SET_LANGUAGE_TYPE = "SET_LANGUAGE";


export const setCurrentPantry = (pantry?: Pantry): CustomAction => {
    return {
        type: SET_CURRENT_PANTRY_TYPE,
        payload: pantry
    };
}

export const setCurrentItem = (item?: Item): CustomAction => {
    return {
        type: SET_CURRENT_ITEM_TYPE,
        payload: item
    };
}

export const setCurrentTransaction = (transaction?: Transaction): CustomAction => {
    return {
        type: SET_CURRENT_TRANSACTION_TYPE,
        payload: transaction
    };
}

export const setCurrentMeal = (meal?: Meal): CustomAction => {
    return {
        type: SET_CURRENT_MEAL_TYPE,
        payload: meal
    };
}

export const setCurrentFoodConsumption = (foodConsumption?: FoodConsumption): CustomAction => {
    return {
        type: SET_CURRENT_FOOD_CONSUMPTION_TYPE,
        payload: foodConsumption
    };
}

export const setCurrentTabIndex = (index: number): CustomAction => {
    return {
        type: SET_CURRENT_TAB_INDEX_TYPE,
        payload: index
    };
}

export const setError = (error: string): CustomAction => {
    return {
        type: SET_ERROR_TYPE,
        payload: error
    };
}

export const clearError = (): CustomAction => {
    return {
        type: CLEAR_ERROR_TYPE
    };
}

export const setUser = (user: User): CustomAction => {
    return {
        type: SET_USER_TYPE,
        payload: user
    };
}

export const clearUser = (): CustomAction => {
    return {
        type: CLEAR_USER_TYPE
    };
}

export const addToShoppingList = (item: ShoppingItem): CustomAction => {
    return {
        type: ADD_TO_SHOPPING_LIST_TYPE,
        payload: item
    };
}

export const removeFromShoppingList = (item: ShoppingItem): CustomAction => {
    return {
        type: REMOVE_FROM_SHOPPING_LIST_TYPE,
        payload: item
    };
}

export const updateShoppingList = (item: ShoppingItem): CustomAction => {
    return {
        type: UPDATE_SHOPPING_LIST_TYPE,
        payload: item
    };
}

export const clearShoppingList = (): CustomAction => {
    return {
        type: CLEAR_SHOPPING_LIST_TYPE
    };
}

export const setCurrentShoppingItem = (item?: ShoppingItem): CustomAction => {
    return {
        type: SET_CURRENT_SHOPPING_ITEM_TYPE,
        payload: item
    };
}

export const setCurrentMealDate = (date: Date): CustomAction => {
    return {
        type: SET_CURRENT_MEAL_DATE_TYPE,
        payload: date
    };
}

export const setLanguage = (language: string): CustomAction => {
    return {
        type: SET_LANGUAGE_TYPE,
        payload: language
    };
}
