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
    const url = `${baseUrl}/item/?pantryId=${item.pantryId}`;
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

export const addShoppingItemList = async (shoppingItemList: ShoppingItem[], pantryId: string, controller: AbortController) => {
    const url = `${baseUrl}/item/all?pantryId=${pantryId}`;
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

export const getAllItems = async (onlyAvailable: boolean = false, pantryId: string, controller: AbortController) => {
    const url = `${baseUrl}/item/?onlyAvailable=${onlyAvailable}&pantryId=${pantryId}`;
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

export const getItemStatistics = async (pantryId: string, controller: AbortController) => {
    const url = `${baseUrl}/item/statistics?pantryId=${pantryId}`;
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

export const getItemDetail = async (itemId: string, pantryId: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${itemId}/detail?pantryId=${pantryId}`;
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

export const updateItem = async (item: Item, pantryId: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${item.id}?pantryId=${pantryId}`;
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

export const deleteItem = async (id: string, pantryId: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${id}?pantryId=${pantryId}`;
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

export const getFoodKcal = async (foodId: string, quantity: number, pantryId: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${foodId}/kcal?quantity=${quantity}&pantryId=${pantryId}`;
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

export const addTransactionToItem = async (itemId: string, transaction: Transaction, pantryId: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${itemId}/transaction?pantryId=${pantryId}`;
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

export const getAllItemTransaction = async (itemId: string, onlyAvailable: boolean = false, pantryId: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${itemId}/transaction?onlyAvailable=${onlyAvailable}&pantryId=${pantryId}`;
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

export const updateItemTransaction = async (itemId: string, transaction: Transaction, pantryId: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${itemId}/transaction?pantryId=${pantryId}`;
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

export const deleteItemTransaction = async (itemId: string, transactionId: string, pantryId: string, controller: AbortController) => {
    const url = `${baseUrl}/item/${itemId}/transaction/${transactionId}?pantryId=${pantryId}`;
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
