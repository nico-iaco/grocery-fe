import {Item} from "../model/item";
import axios from "axios";
import {BaseResponse} from "../model/baseResponse";
import {Transaction} from "../model/transaction";
import {FoodDetail} from "../model/foodDetails";
import {ItemStatistics} from "../model/itemStatistics";
import {ShoppingItem} from "../model/shoppingItem";
import {getFirebaseUserToken} from "../utils/firebaseUtils";

export const baseUrl = import.meta.env.VITE_BASE_URL

export const addItem = async (item: Item, controller: AbortController) => {
    const url = `${baseUrl}/item/`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.post(
        url,
        item,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            signal: controller.signal,
        }
    );
    const baseResponse: BaseResponse<Item> = axiosResponse.data;
    return baseResponse.body;
}

export const addShoppingItemList = async (shoppingItemList: ShoppingItem[], controller: AbortController) => {
    const url = `${baseUrl}/item/all`;
    const token = await getFirebaseUserToken()
    const request = {
        shoppingItems: shoppingItemList
    }
    const axiosResponse = await axios.post(
        url,
        request,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            signal: controller.signal,
        }
    );
    const baseResponse: BaseResponse<Item[]> = axiosResponse.data;
    return baseResponse.body;
}

export const getAllItems = async (onlyAvailable: boolean = false, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/item/?onlyAvailable=${onlyAvailable}`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<Item[]> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const getItemStatistics = async (userid: string, controller: AbortController) => {
    const url = `${baseUrl}/item/statistics`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<ItemStatistics> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const getItemDetail = async (itemId: string, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${itemId}/detail`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<FoodDetail> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const updateItem = async (item: Item, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${item.id}`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.patch(url, item, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<Item> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const deleteItem = async (id: string, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${id}`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.delete(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<string> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const getFoodKcal = async (foodId: string, quantity: number, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${foodId}/kcal?quantity=${quantity}`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<number> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const addTransactionToItem = async (itemId: string, transaction: Transaction, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${itemId}/transaction`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.post(url, transaction, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<Transaction> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const getAllItemTransaction = async (itemId: string, onlyAvailable: boolean = false, userId: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${itemId}/transaction?onlyAvailable=${onlyAvailable}`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<Transaction[]> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const updateItemTransaction = async (itemId: string, transaction: Transaction, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${itemId}/transaction`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.patch(url, transaction, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<Transaction> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const deleteItemTransaction = async (itemId: string, transactionId: string, userid: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${itemId}/transaction/${transactionId}`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.delete(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<string> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}
