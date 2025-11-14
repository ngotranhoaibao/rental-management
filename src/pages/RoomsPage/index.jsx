import React, { useEffect, useState } from "react";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "@/service/api/rooms";
import Datatable from "@/components/Datatable";
import { formatted } from "@/until/formatMoney";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import HeaderSection from "@/components/HeaderSection";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DialogCreateRoom from "@/components/DialogCreateRoom";
const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [nameRoom, setNameRoom] = useState("");
  const [priceRoom, setPriceRoom] = useState(0);
  const [statusRoom, setStatusRoom] = useState("available");
  const [descriptionRoom, setDescriptionRoom] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const _id = Date.now();
  const handleOpenDiglog = () => {
    setIsEditing(false);
    setEditingRoomId(null);
    setOpen(true);
  };
  const handleOpenEditDialog = (room) => {
    setIsEditing(true);
    setEditingRoomId(room._id || room.id);
    setNameRoom(room.name);
    setPriceRoom(room.price);
    setStatusRoom(room.status);
    setDescriptionRoom(room.description);
    setOpen(true);
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await getRooms();
      console.log("Rooms data:", res?.data?.data);

      setRooms(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const newRoom = {
        name: nameRoom,
        price: priceRoom,
        status: statusRoom,
        description: descriptionRoom,
      };
      console.log("newRoom", newRoom);

      await createRoom(newRoom);
      fetchRooms();
      setOpen(false);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };
  const handleDeleteRoom = async (id) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa phòng này không?"
    );

    if (!confirmed) {
      return;
    }
    try {
      await deleteRoom(id);
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };
  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    if (!editingRoomId) return;
    try {
      const updatedData = {
        name: nameRoom,
        price: Number(priceRoom),
        status: statusRoom,
        description: descriptionRoom,
      };
      await updateRoom(editingRoomId, updatedData);
      fetchRooms();
      setOpen(false);

      setEditingRoomId(null);
      setIsEditing(false);
      setNameRoom("");
      setPriceRoom(0);
      setStatusRoom("available");
      setDescriptionRoom("");
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };
  const roomColumns = ["name", "price", "status"];
  const roomActions = (item) => (
    <>
      <button
        className="hover:bg-accent p-2 rounded-lg"
        onClick={() => handleOpenEditDialog(item)}
      >
        <IconEdit className="text-blue-500" width={20} height={20} stroke={2} />
      </button>
      <button
        className="hover:bg-accent p-2 rounded-lg"
        onClick={() => {
          handleDeleteRoom(item._id || item.id);
        }}
      >
        <IconTrash className="text-red-500" width={20} height={20} stroke={2} />
      </button>
    </>
  );

  return (
    <div className="space-y-8">
      <HeaderSection
        title="Rooms Management"
        description="Manage your rental rooms"
        add="Create Room"
        placeholder="Search by room name..."
        handleOpenDiglog={handleOpenDiglog}
      />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <Card className="bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="leading-none font-semibold">
              All Rooms
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <Datatable
              data={rooms}
              columns={roomColumns}
              actions={roomActions}
              handleDeleteRoom={handleDeleteRoom}
            />
          </CardContent>
        </Card>
      )}
      <DialogCreateRoom
        open={open}
        setOpen={setOpen}
        nameRoom={nameRoom}
        setNameRoom={setNameRoom}
        priceRoom={priceRoom}
        setPriceRoom={setPriceRoom}
        statusRoom={statusRoom}
        setStatusRoom={setStatusRoom}
        descriptionRoom={descriptionRoom}
        setDescriptionRoom={setDescriptionRoom}
        handleCreateRoom={handleCreateRoom}
        handleUpdateRoom={handleUpdateRoom}
        isEditing={isEditing}
      />
    </div>
  );
};

export default RoomsPage;
