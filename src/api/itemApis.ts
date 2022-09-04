import {Item} from "../model/item";
import axios from "axios";
import {BaseResponse} from "../model/baseResponse";
import {Transaction} from "../model/transaction";

export const baseUrl = "/api";

export const addItem = async (item: Item) => {
    const url = `${baseUrl}/item/`;
    const axiosResponse = await axios.post(
        url,
        item
    );
    const baseResponse: BaseResponse<Item> = axiosResponse.data;
    return baseResponse.body;
}

export const getAllItems = async () => {
    const url = `${baseUrl}/item/`;
    const axiosResponse = await axios.get(url);
    const baseResponse: BaseResponse<Item[]> = axiosResponse.data;
    return baseResponse.body;
}

export const deleteItem = async (id: string) => {
    const url = `${baseUrl}/item/${id}`;
    const axiosResponse = await axios.delete(url);
    const baseResponse: BaseResponse<string> = axiosResponse.data;
    return baseResponse.body;
}

export const addTransactionToItem = async (itemId: string, transaction: Transaction) => {
    const url = `${baseUrl}/item/${itemId}/transaction`;
    const axiosResponse = await axios.post(url, transaction);
    const baseResponse: BaseResponse<Transaction> = axiosResponse.data;
    return baseResponse.body;
}

export const getAllItemTransaction = async (itemId: string) => {
    const url = `${baseUrl}/item/${itemId}/transaction`;
    const axiosResponse = await axios.get(url);
    const baseResponse: BaseResponse<Transaction[]> = axiosResponse.data;
    return baseResponse.body;
}

export const deleteItemTransaction= async (itemId: string, transactionId: string) => {
    const url = `${baseUrl}/item/${itemId}/transaction/${transactionId}`;
    const axiosResponse = await axios.delete(url);
    const baseResponse: BaseResponse<string> = axiosResponse.data;
    return baseResponse.body;
}
