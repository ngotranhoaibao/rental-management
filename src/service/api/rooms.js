import api from "./index.js";
export const getRooms = async () => {
  return await api.get("/rooms");
};
export const createRoom = async (roomData) => {
  const response = await api.post("/rooms", roomData);
  return response.data;
};

export const updateRoom = async (id, payload) => {
  return await api.put(`/rooms`, payload, {
    params: { id: id },
  });
};
export const deleteRoom = async (id) => {
  return await api.delete(`/rooms`, {
    params: { id: id },
  });
};
