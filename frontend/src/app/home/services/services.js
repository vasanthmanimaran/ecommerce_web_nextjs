import { apiInstance } from "@/app/interceptor/interceptor";



export const getbanner = async () => {
    const res = await apiInstance.get(`/getbanner`);
    return res;
};


export const getcard = async () => {
    const res = await apiInstance.get(`/getcard`);
    return res;
};