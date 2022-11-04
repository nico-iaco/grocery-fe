import {
    Action,
    CLEAR_ERROR_TYPE,
    CLEAR_USER_TYPE,
    SET_CURRENT_FOOD_CONSUMPTION_TYPE,
    SET_CURRENT_ITEM_TYPE,
    SET_CURRENT_MEAL_TYPE,
    SET_CURRENT_TAB_INDEX_TYPE,
    SET_CURRENT_TRANSACTION_TYPE,
    SET_ERROR_TYPE,
    SET_USER_TYPE,
    UPDATE_CURRENT_FOOD_CONSUMPTION_TYPE,
    UPDATE_CURRENT_ITEM_TYPE,
    UPDATE_CURRENT_MEAL_TYPE,
    UPDATE_CURRENT_TRANSACTION_TYPE
} from "../action/Action";
import {Item} from "../model/item";
import {Transaction} from "../model/transaction";
import {Meal} from "../model/meal";
import {FoodConsumption} from "../model/foodConsumption";
import {AppError} from "../model/appError";
import {User} from "../model/user";

export interface GroceryState {
    currentItem: Item | undefined;
    currentTransaction: Transaction | undefined;
    currentMeal: Meal | undefined;
    currentFoodConsumption: FoodConsumption | undefined;
    currentTabIndex: number;
    user: User | undefined;
    error: AppError | undefined;
}

export const initialState: GroceryState = {
    currentItem: undefined,
    currentTransaction: undefined,
    currentMeal: undefined,
    currentFoodConsumption: undefined,
    currentTabIndex: 0,
    user: undefined,
    error: undefined
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
        case SET_CURRENT_TAB_INDEX_TYPE:
            return {
                ...state,
                currentTabIndex: action.payload
            }
        case SET_ERROR_TYPE:
            return {
                ...state,
                error: {
                    message: action.payload,
                    isInErrorState: true
                }
            }
        case CLEAR_ERROR_TYPE:
            return {
                ...state,
                error: undefined
            }
        case SET_USER_TYPE:
            return {
                ...state,
                user: action.payload
            }
        case CLEAR_USER_TYPE:
            return {
                ...state,
                user: undefined
            }
        default:
            return state;
    }
}
