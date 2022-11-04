import {GroceryState} from "../reducer/Reducer";
import {Item} from "../model/item";
import {Transaction} from "../model/transaction";
import {Meal} from "../model/meal";
import {FoodConsumption} from "../model/foodConsumption";
import {AppError} from "../model/appError";
import {User} from "../model/user";

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
