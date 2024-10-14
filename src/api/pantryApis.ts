import {getFirebaseUserToken} from "../utils/firebaseUtils";
import axios from "axios";
import {BaseResponse} from "../model/baseResponse";
import {Pantry} from "../model/pantry";

export const baseUrl = import.meta.env.VITE_BASE_URL

export const createPantry = async (pantry: Pantry, controller: AbortController) => {
    const url = `${baseUrl}/pantry/`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.post(
        url,
        pantry,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            signal: controller.signal,
        }
    );
    const baseResponse: BaseResponse<Pantry> = axiosResponse.data;
    return baseResponse.body;
}

export const getAllPantries = async (controller: AbortController) => {
    const url = `${baseUrl}/pantry/`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal: controller.signal,
    });
    const baseResponse: BaseResponse<Pantry[]> = axiosResponse.data;
    if (baseResponse.errorMessage !== null && baseResponse.errorMessage !== "") {
        throw new Error(baseResponse.errorMessage);
    }
    return baseResponse.body;
}

export const addSharedPantry = async (pantryId: string, controller: AbortController) => {
    const url = `${baseUrl}/pantry/${pantryId}/share`;
    const token = await getFirebaseUserToken()
    const axiosResponse = await axios.post(
        url,
        {},
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            signal: controller.signal,
        }
    );
    const baseResponse: BaseResponse<Pantry> = axiosResponse.data;
    return baseResponse.body;
}

