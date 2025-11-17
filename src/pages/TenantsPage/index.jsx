import React, { useEffect, useState } from "react";
import HeaderSection from "@/components/HeaderSection";
import toast from "react-hot-toast";
import Datatable from "@/components/DataTable";
import { Spinner } from "@/components/ui/spinner";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  getTenants,
  createTenant,
  updateTenant,
  deleteTenant,
} from "@/service/api/tenants";
import { getRooms } from "@/service/api/rooms";
import DialogCreateTenants from "@/components/DialogCreateTenants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TenantsPage = () => {
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    idCard: "",
    roomId: "",
    status: "active",
    moveInDate: "",
    moveOutDate: "",
    note: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const fetchTenants = async () => {
    setLoading(true);
    try {
      const res = await getTenants();
      setTenants(res?.data || []);
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách tenants");
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await getRooms();
      console.log("Rooms API response:", res);
      setRooms(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phòng:", error);
      toast.error("Lỗi khi lấy danh sách phòng");
      setRooms([]);
    }
  };

  useEffect(() => {
    fetchTenants();
    fetchRooms();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      idCard: "",
      roomId: "",
      status: "active",
      moveInDate: "",
      moveOutDate: "",
      note: "",
    });
  };

  const handleOpenDialog = () => {
    resetForm();
    setOpen(true);
  };

  const handleSaveTenant = async (e) => {
    e.preventDefault();

    const { name, phone, idCard, roomId } = formData;

    if (!name || !phone || !idCard || !roomId) {
      toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    console.log("Payload gửi lên API:", formData);

    try {
      setLoading(true);
      if (editingId) {
        await updateTenant(editingId, formData);
        toast.success("Cập nhật người thuê thành công!");
      } else {
        await createTenant(formData);
        toast.success("Thêm người thuê thành công!");
      }
      await fetchTenants();
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Lỗi khi lưu người thuê:", error);
      console.error("Axios response data:", error?.response?.data);
      console.error("Axios status:", error?.response?.status);
      toast.error(
        error?.response?.data?.message ||
          JSON.stringify(error?.response?.data) ||
          "Lỗi khi lưu người thuê."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTenant = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người thuê này không?"))
      return;
    try {
      setLoading(true);
      await deleteTenant(id);
      toast.success("Xóa người thuê thành công!");
      await fetchTenants();
    } catch (error) {
      toast.error("Lỗi khi xóa người thuê.");
    } finally {
      setLoading(false);
    }
  };
  const handleEditTenant = (tenant) => {
    setEditingId(tenant._id);
    setFormData({
      name: tenant.name || "",
      phone: tenant.phone || "",
      email: tenant.email || "",
      idCard: tenant.idCard || "",
      roomId: tenant.roomId?._id || "",
      status: tenant.status || "active",
      moveInDate: tenant.moveInDate || "",
      moveOutDate: tenant.moveOutDate || "",
      note: tenant.note || "",
    });
    setOpen(true);
  };

  const tenantColumns = ["name", "phone", "idCard", "roomId.name"];
  const tenantsActions = (tenant) => (
    <>
      <button
        className="hover:bg-accent p-2 rounded-lg"
        onClick={() => handleEditTenant(tenant)}
      >
        <IconEdit className="text-blue-500" width={20} height={20} stroke={2} />
      </button>
      <button
        className="hover:bg-accent p-2 rounded-lg"
        onClick={() => handleDeleteTenant(tenant._id)}
      >
        <IconTrash className="text-red-500" width={20} height={20} stroke={2} />
      </button>
    </>
  );
  const availableRooms = rooms.filter((room) => room.status === "available");
  const filteredTenants = tenants.filter((tenant) => {
    const term = searchTerm.toLowerCase();
    return (
      tenant.name?.toLowerCase().includes(term) ||
      tenant.phone?.toLowerCase().includes(term) ||
      tenant.idCard?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8">
      <HeaderSection
        title="Tenants Management"
        description="Manage your tenants"
        add="Add Tenant"
        placeholder="Search by name or phone..."
        handleOpenDiglog={handleOpenDialog}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : filteredTenants.length > 0 ? (
        <Card className="bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="leading-none font-semibold">
              All Rooms
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <Datatable
              data={filteredTenants}
              columns={tenantColumns}
              actions={tenantsActions}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-6 text-gray-500 font-medium">
          No tenant found
        </div>
      )}

      <DialogCreateTenants
        open={open}
        setOpen={setOpen}
        formData={formData}
        setFormData={setFormData}
        handleSaveTenant={handleSaveTenant}
        editingId={editingId}
        rooms={availableRooms}
      />
    </div>
  );
};

export default TenantsPage;
