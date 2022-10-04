import {GroceryState} from "../reducer/Reducer";

export const getCurrentItem = (state: GroceryState) => {
    return state.currentItem;
}

export const getCurrentTransaction = (state: GroceryState) => {
    return state.currentTransaction;
}

export const getCurrentMeal = (state: GroceryState) => {
    return state.currentMeal;
}
