import api from "./index.js";
export const getTenants = async () => {
    const response = await api.get("/tenants");
    return response.data;
}
export const createTenant = async (tenantData) => {
    const response = await api.post("/tenants", tenantData);
    return response.data;
}
export const updateTenant = async (id, tenantData) => {
      return await api.put(`/tenants`, tenantData, {
    params: { id: id },
      });
}
export const deleteTenant = async (id) => {
      return await api.delete(`/tenants`, {
    params: { id: id },
      });
}