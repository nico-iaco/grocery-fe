import {
    Action, SET_CURRENT_FOOD_CONSUMPTION_TYPE,
    SET_CURRENT_ITEM_TYPE, SET_CURRENT_MEAL_TYPE,
    SET_CURRENT_TRANSACTION_TYPE, UPDATE_CURRENT_FOOD_CONSUMPTION_TYPE,
    UPDATE_CURRENT_ITEM_TYPE, UPDATE_CURRENT_MEAL_TYPE,
    UPDATE_CURRENT_TRANSACTION_TYPE
} from "../action/Action";
import {Item} from "../model/item";
import {Transaction} from "../model/transaction";
import {Meal} from "../model/meal";
import {FoodConsumption} from "../model/foodConsumption";

export interface GroceryState {
    currentItem: Item | undefined;
    currentTransaction: Transaction | undefined;
    currentMeal: Meal | undefined;
    currentFoodConsumption: FoodConsumption | undefined;
}

export const initialState: GroceryState = {
    currentItem: undefined,
    currentTransaction: undefined,
    currentMeal: undefined,
    currentFoodConsumption: undefined
}

export function eventReducer(state: GroceryState = initialState, action: Action): GroceryState {
    switch (action.type) {
        case SET_CURRENT_ITEM_TYPE:
            return {
                ...state,
                currentItem: action.payload
            }
        case UPDATE_CURRENT_ITEM_TYPE:
            return {
                ...state,
                currentItem: action.payload
            }
        case SET_CURRENT_TRANSACTION_TYPE:
            return {
                ...state,
                currentTransaction: action.payload
            }
        case UPDATE_CURRENT_TRANSACTION_TYPE:
            return {
                ...state,
                currentTransaction: action.payload
            }
        case SET_CURRENT_MEAL_TYPE:
            return {
                ...state,
                currentMeal: action.payload
            }
        case UPDATE_CURRENT_MEAL_TYPE:
            return {
                ...state,
                currentMeal: action.payload
            }
        case SET_CURRENT_FOOD_CONSUMPTION_TYPE:
            return {
                ...state,
                currentFoodConsumption: action.payload
            }
        case UPDATE_CURRENT_FOOD_CONSUMPTION_TYPE:
            return {
                ...state,
                currentFoodConsumption: action.payload
            }
        default:
            return state;
    }
}
