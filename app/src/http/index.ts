import { TRoom } from "@/types";
import axios, { AxiosRequestConfig } from "axios";

const axiosRequestConfig: AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL!,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
}

export async function createRoom({ name: roomname, code: password }: TRoom) {
    return await axios.post(
        "/api/room/create",
        {
            room: roomname,
            code: password
        },
        axiosRequestConfig
    )
}

export async function validateRoom({ name: roomid, code: password }: TRoom) {
    return await axios.post(
        "/api/room/validate",
        {
            room: roomid,
            code: password
        },
        axiosRequestConfig
    )
}
