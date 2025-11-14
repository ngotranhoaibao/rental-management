import api from "./index.js";
export const getBills = async () => {
    return await api.get("/bills");
}
export const createBill = async (billData) => {
    const response = await api.post("/bills", billData);
    return response.data;
}
export const updateBill = async (id, billData) => {
    const response = await api.put(`/bills/${id}`, billData);
    return response.data;
}
export const deleteBill = async (id) => {
    const response = await api.delete(`/bills/${id}`);
    return response.data;
}