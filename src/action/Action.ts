import {Item} from "../model/item";
import {Transaction} from "../model/transaction";

export interface Action {
    type: string;
    payload?: any;
}

export const SET_CURRENT_ITEM_TYPE = "SET_CURRENT_ITEM";
export const UPDATE_CURRENT_ITEM_TYPE = "UPDATE_CURRENT_ITEM";

export const SET_CURRENT_TRANSACTION_TYPE = "SET_CURRENT_TRANSACTION";
export const UPDATE_CURRENT_TRANSACTION_TYPE = "UPDATE_CURRENT_TRANSACTION";


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

