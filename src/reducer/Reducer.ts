import {
    ADD_TO_SHOPPING_LIST_TYPE,
    CLEAR_ERROR_TYPE,
    CLEAR_SHOPPING_LIST_TYPE,
    CLEAR_USER_TYPE,
    CustomAction,
    REMOVE_FROM_SHOPPING_LIST_TYPE,
    SET_CURRENT_FOOD_CONSUMPTION_TYPE,
    SET_CURRENT_ITEM_TYPE,
    SET_CURRENT_MEAL_DATE_TYPE,
    SET_CURRENT_MEAL_TYPE,
    SET_CURRENT_SHOPPING_ITEM_TYPE,
    SET_CURRENT_TAB_INDEX_TYPE,
    SET_CURRENT_TRANSACTION_TYPE,
    SET_ERROR_TYPE,
    SET_LANGUAGE_TYPE,
    SET_USER_TYPE,
    UPDATE_SHOPPING_LIST_TYPE
} from "../action/Action";
import {Item} from "../model/item";
import {Transaction} from "../model/transaction";
import {Meal} from "../model/meal";
import {FoodConsumption} from "../model/foodConsumption";
import {AppError} from "../model/appError";
import {User} from "../model/user";
import {ShoppingItem} from "../model/shoppingItem";

export interface GroceryState {
    currentItem: Item | undefined;
    currentTransaction: Transaction | undefined;
    currentMeal: Meal | undefined;
    currentFoodConsumption: FoodConsumption | undefined;
    currentTabIndex: number;
    currentShoppingItem: ShoppingItem | undefined;
    shoppingList: ShoppingItem[];
    user: User | undefined;
    currentMealDate: Date;
    isUserPersisted: boolean;
    error: AppError | undefined;
    language: string | undefined;
}

export const initialState: GroceryState = {
    currentItem: undefined,
    currentTransaction: undefined,
    currentMeal: undefined,
    currentFoodConsumption: undefined,
    currentTabIndex: 0,
    currentShoppingItem: undefined,
    shoppingList: [],
    user: undefined,
    currentMealDate: new Date(),
    error: undefined,
    language: undefined,
    isUserPersisted: false,
}

export function eventReducer(state: GroceryState = initialState, action: CustomAction): GroceryState {
    switch (action.type) {
        case SET_CURRENT_ITEM_TYPE:
            return {
                ...state,
                currentItem: action.payload
            }
        case SET_CURRENT_TRANSACTION_TYPE:
            return {
                ...state,
                currentTransaction: action.payload
            }
        case SET_CURRENT_MEAL_TYPE:
            return {
                ...state,
                currentMeal: action.payload
            }
        case SET_CURRENT_FOOD_CONSUMPTION_TYPE:
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
        case ADD_TO_SHOPPING_LIST_TYPE:
            return {
                ...state,
                shoppingList: [...state.shoppingList, action.payload]
            }
        case UPDATE_SHOPPING_LIST_TYPE:
            return {
                ...state,
                shoppingList: [...state.shoppingList.filter(shoppingItem => shoppingItem.item.name !== action.payload.item.name), action.payload]
            }
        case REMOVE_FROM_SHOPPING_LIST_TYPE:
            return {
                ...state,
                shoppingList: state.shoppingList.filter(shoppingItem => shoppingItem.item.id !== action.payload.item.id)
            }
        case CLEAR_SHOPPING_LIST_TYPE:
            return {
                ...state,
                shoppingList: []
            }
        case SET_CURRENT_SHOPPING_ITEM_TYPE:
            return {
                ...state,
                currentShoppingItem: action.payload
            }
        case SET_CURRENT_MEAL_DATE_TYPE:
            return {
                ...state,
                currentMealDate: action.payload
            }
        case SET_LANGUAGE_TYPE:
            return {
                ...state,
                language: action.payload
            }
        default:
            return state;
    }
}
