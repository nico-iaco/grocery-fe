import {Item} from "../model/item";
import axios from "axios";
import {BaseResponse} from "../model/baseResponse";

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
