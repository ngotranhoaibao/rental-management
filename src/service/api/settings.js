import api from "./index.js";

export const getSettings = async () => {
    const response = await api.get("/settings");
    return response.data;
}
export const updateSettings = async (settingsData) => {
    const response = await api.put("/settings", settingsData);
    return response.data;
}
export const createSettings = async (settingsData) => {
    const response = await api.post("/settings", settingsData);
    return response.data;
}