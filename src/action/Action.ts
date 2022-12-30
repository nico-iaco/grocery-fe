import {Item} from "../model/item";
import {Transaction} from "../model/transaction";
import {Meal} from "../model/meal";
import {FoodConsumption} from "../model/foodConsumption";
import {User} from "../model/user";
import {ShoppingItem} from "../model/shoppingItem";

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

export const SET_SHOPPING_LIST_TYPE = "SET_SHOPPING_LIST";
export const ADD_TO_SHOPPING_LIST_TYPE = "ADD_TO_SHOPPING_LIST";
export const REMOVE_FROM_SHOPPING_LIST_TYPE = "REMOVE_FROM_SHOPPING_LIST";
export const UPDATE_SHOPPING_LIST_TYPE = "UPDATE_SHOPPING_LIST";
export const CLEAR_SHOPPING_LIST_TYPE = "CLEAR_SHOPPING_LIST";

export const SET_CURRENT_SHOPPING_ITEM_TYPE = "SET_CURRENT_SHOPPING_ITEM";
export const CLEAR_CURRENT_SHOPPING_ITEM_TYPE = "CLEAR_CURRENT_SHOPPING_ITEM";

export const SET_CURRENT_MEAL_DATE_TYPE = "SET_CURRENT_MEAL_DATE";
export const CLEAR_CURRENT_MEAL_DATE_TYPE = "CLEAR_CURRENT_MEAL_DATE";


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

export const setShoppingList = (shoppingList: ShoppingItem[]): Action => {
    return {
        type: SET_SHOPPING_LIST_TYPE,
        payload: shoppingList
    };
}

export const addToShoppingList = (item: ShoppingItem): Action => {
    return {
        type: ADD_TO_SHOPPING_LIST_TYPE,
        payload: item
    };
}

export const removeFromShoppingList = (item: ShoppingItem): Action => {
    return {
        type: REMOVE_FROM_SHOPPING_LIST_TYPE,
        payload: item
    };
}

export const updateShoppingList = (item: ShoppingItem): Action => {
    return {
        type: UPDATE_SHOPPING_LIST_TYPE,
        payload: item
    };
}

export const clearShoppingList = (): Action => {
    return {
        type: CLEAR_SHOPPING_LIST_TYPE
    };
}

export const setCurrentShoppingItem = (item?: ShoppingItem): Action => {
    return {
        type: SET_CURRENT_SHOPPING_ITEM_TYPE,
        payload: item
    };
}

export const clearCurrentShoppingItem = (): Action => {
    return {
        type: CLEAR_CURRENT_SHOPPING_ITEM_TYPE
    };
}

export const setCurrentMealDate = (date: Date): Action => {
    return {
        type: SET_CURRENT_MEAL_DATE_TYPE,
        payload: date
    };
}

export const clearCurrentMealDate = (): Action => {
    return {
        type: CLEAR_CURRENT_MEAL_DATE_TYPE
    };
}
