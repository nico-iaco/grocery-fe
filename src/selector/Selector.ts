import {GroceryState} from "../reducer/Reducer";
import {Item} from "../model/item";
import {Transaction} from "../model/transaction";
import {Meal} from "../model/meal";
import {FoodConsumption} from "../model/foodConsumption";
import {AppError} from "../model/appError";
import {User} from "../model/user";
import {ShoppingItem} from "../model/shoppingItem";

export const getCurrentItem = (state: GroceryState) : Item | undefined => {
    return state.currentItem;
}

export const getCurrentTransaction = (state: GroceryState) : Transaction | undefined => {
    return state.currentTransaction;
}

export const getCurrentMeal = (state: GroceryState) : Meal | undefined => {
    return state.currentMeal;
}

export const getCurrentFoodConsumption = (state: GroceryState) : FoodConsumption | undefined => {
    return state.currentFoodConsumption;
}

export const getCurrentTabIndex = (state: GroceryState) : number => {
    return state.currentTabIndex;
}

export const getError = (state: GroceryState) : AppError | undefined => {
    return state.error;
}

export const getUser = (state: GroceryState) : User | undefined => {
    return state.user;
}

export const getShoppingList = (state: GroceryState) : ShoppingItem[] => {
    return state.shoppingList;
}

export const getCurrentShoppingItem = (state: GroceryState) : ShoppingItem | undefined => {
    return state.currentShoppingItem;
}

export const getCurrentMealDate = (state: GroceryState) : Date => {
    return state.currentMealDate;
}

export const getLanguage = (state: GroceryState) : string | undefined => {
    return state.language;
}

