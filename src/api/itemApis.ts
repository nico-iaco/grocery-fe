import {Item} from "../model/item";
import axios from "axios";
import {BaseResponse} from "../model/baseResponse";
import {Transaction} from "../model/transaction";
import {FoodDetail} from "../model/foodDetails";
import {ItemStatistics} from "../model/itemStatistics";

export const baseUrl = process.env.REACT_APP_BASE_URL

export const addItem = async (item: Item) => {
    const url = `${baseUrl}/item/`;
    const axiosResponse = await axios.post(
        url,
        item
    );
    const baseResponse: BaseResponse<Item> = axiosResponse.data;
    return baseResponse.body;
}

export const getAllItems = async (onlyAvailable: boolean = false) => {
    const url = `${baseUrl}/item/?onlyAvailable=${onlyAvailable}`;
    const axiosResponse = await axios.get(url);
    const baseResponse: BaseResponse<Item[]> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const getItemStatistics = async () => {
    const url = `${baseUrl}/item/statistics`;
    const axiosResponse = await axios.get(url);
    const baseResponse: BaseResponse<ItemStatistics> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const getItem = async (itemId: string) => {
    const url = `${baseUrl}/item/${itemId}`;
    const axiosResponse = await axios.get(url);
    const baseResponse: BaseResponse<Item> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const getItemDetail = async (itemId: string) => {
    const url = `${baseUrl}/item/${itemId}/detail`;
    const axiosResponse = await axios.get(url);
    const baseResponse: BaseResponse<FoodDetail> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const updateItem = async (item: Item) => {
    const url = `${baseUrl}/item/${item.id}`;
    const axiosResponse = await axios.patch(url, item);
    const baseResponse: BaseResponse<Item> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;}

export const deleteItem = async (id: string) => {
    const url = `${baseUrl}/item/${id}`;
    const axiosResponse = await axios.delete(url);
    const baseResponse: BaseResponse<string> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;}

export const getFoodKcal = async (foodId: string, quantity: number) => {
    const url = `${baseUrl}/item/${foodId}/kcal?quantity=${quantity}`;
    const axiosResponse = await axios.get(url);
    const baseResponse: BaseResponse<number> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;}

export const addTransactionToItem = async (itemId: string, transaction: Transaction) => {
    const url = `${baseUrl}/item/${itemId}/transaction`;
    const axiosResponse = await axios.post(url, transaction);
    const baseResponse: BaseResponse<Transaction> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;}

export const getAllItemTransaction = async (itemId: string, onlyAvailable: boolean = false) => {
    const url = `${baseUrl}/item/${itemId}/transaction?onlyAvailable=${onlyAvailable}`;
    const axiosResponse = await axios.get(url);
    const baseResponse: BaseResponse<Transaction[]> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;}

export const getItemTransaction = async (itemId: string, transactionId: string) => {
    const url = `${baseUrl}/item/${itemId}/transaction/${transactionId}`;
    const axiosResponse = await axios.get(url);
    const baseResponse: BaseResponse<Transaction> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const updateItemTransaction = async (itemId: string, transaction: Transaction) => {
    const url = `${baseUrl}/item/${itemId}/transaction`;
    const axiosResponse = await axios.patch(url, transaction);
    const baseResponse: BaseResponse<Transaction> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;}

export const deleteItemTransaction = async (itemId: string, transactionId: string) => {
    const url = `${baseUrl}/item/${itemId}/transaction/${transactionId}`;
    const axiosResponse = await axios.delete(url);
    const baseResponse: BaseResponse<string> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}
