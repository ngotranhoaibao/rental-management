import api from "./index.js";
export const getBills = async () => {
    return await api.get("/bills");
}
export const createBill = async (billData) => {
    const response = await api.post("/bills", billData);
    return response.data;
}
export const updateBill = async (id, billData) => {
      return await api.put(`/bills`, billData, {
    params: { id: id },
      });
}
export const deleteBill = async (id) => {
      return await api.delete(`/bills`, {
    params: { id: id },
      });
}