import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HeaderSection from "@/components/HeaderSection";
import Datatable from "@/components/DataTable";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import DialogCreateBills from "@/components/DialogCreateBills";

import { getBills, createBill, updateBill, deleteBill } from "@/service/api/bills.js";
import { getTenants } from "@/service/api/tenants.js";
import { getRooms } from "@/service/api/rooms.js";

const BillsPage = () => {
  const [open, setOpen] = useState(false);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [tenantId, setTenantId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("unpaid");
  const [oldElectricityIndex, setOldElectricityIndex] = useState(0);
  const [newElectricityIndex, setNewElectricityIndex] = useState(0);
  const [oldWaterIndex, setOldWaterIndex] = useState(0);
  const [newWaterIndex, setNewWaterIndex] = useState(0);
  const [rent, setRent] = useState(0);
  const [note, setNote] = useState("");

  const [tenantList, setTenantList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [filterRoomId, setFilterRoomId] = useState([]);

  // -------------------- Fetch dữ liệu --------------------
  const fetchData = async () => {
    setLoading(true);
    try {
      const billsRes = await getBills();
      // bills may be in billsRes.data or billsRes.data.data or billsRes directly
      const rawBills = billsRes?.data?.data ?? billsRes?.data ?? billsRes ?? [];

      // compute total for each bill and ensure numeric fields present
      const mappedBills = (Array.isArray(rawBills) ? rawBills : []).map((b) => {
        // fallback values
        const oldEl = Number(b.oldElectricityIndex ?? 0);
        const newEl = Number(b.newElectricityIndex ?? 0);
        const oldW = Number(b.oldWaterIndex ?? 0);
        const newW = Number(b.newWaterIndex ?? 0);
        const electricityPrice = Number(b.electricityPrice ?? b?.roomId?.electricityPrice ?? 0);
        const waterPrice = Number(b.waterPrice ?? b?.roomId?.waterPrice ?? 0);
        const internetFee = Number(b.internetFee ?? 0);
        const rentVal = Number(b.rent ?? 0);

        const electricityCost = Math.max(0, newEl - oldEl) * electricityPrice;
        const waterCost = Math.max(0, newW - oldW) * waterPrice;
        const total = electricityCost + waterCost + internetFee + rentVal;

        return {
          ...b,
          electricityCost,
          waterCost,
          total,
        };
      });

      setBills(mappedBills);

      const tenantsRes = await getTenants();
      setTenantList(tenantsRes?.data || []);

      const roomsRes = await getRooms();
      setRoomList(roomsRes?.data?.data || []);
      setFilterRoomId(roomsRes?.data?.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // -------------------- Reset form --------------------
  const resetForm = () => {
    setEditingId(null);
    setTenantId("");
    setRoomId("");
    setMonth("");
    setStatus("unpaid");
    setOldElectricityIndex(0);
    setNewElectricityIndex(0);
    setOldWaterIndex(0);
    setNewWaterIndex(0);
    setRent(0);
    setNote("");
    setFilterRoomId(roomList);
  };

  // -------------------- Mở form tạo mới --------------------
  const handleOpenDialog = () => {
    resetForm();
    setOpen(true);
  };

  // -------------------- Lấy phòng theo tenant --------------------
  const getRoomIdByTenantId = (tenantId) => {
    const tenant = tenantList.find((t) => t._id === tenantId);
    if (tenant?.roomId) setFilterRoomId([tenant.roomId]);
    else setFilterRoomId([]);
  };

  // -------------------- Tạo / Cập nhật hóa đơn --------------------
  const handleCreateBill = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    if (!tenantId || !roomId || !month || rent <= 0) {
      toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        tenantId,
        roomId,
        month,
        status,
        rent: Number(rent),
        oldElectricityIndex: Number(oldElectricityIndex),
        newElectricityIndex: Number(newElectricityIndex),
        oldWaterIndex: Number(oldWaterIndex),
        newWaterIndex: Number(newWaterIndex),
        note: note || "",
      };

      if (editingId) {
        // Update bill
        await updateBill(editingId, payload);
        toast.success("Cập nhật hóa đơn thành công!");
      } else {
        // Create bill
        await createBill(payload);
        toast.success("Tạo hóa đơn thành công!");
      }

      await fetchData();
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Lỗi khi lưu hóa đơn.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Xóa hóa đơn --------------------
  const handleDeleteBill = async (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này không?");
    if (!confirmed) return;

    try {
      setLoading(true);
      await deleteBill(id);
      toast.success("Xóa hóa đơn thành công!");
      await fetchData();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Lỗi khi xóa hóa đơn.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Chỉnh sửa hóa đơn --------------------
  const handleEditBill = (bill) => {
    setEditingId(bill._id);
    setTenantId(bill.tenantId?._id || "");
    setRoomId(bill.roomId?._id || "");
    setMonth(bill.month || "");
    setStatus(bill.status || "unpaid");
    setOldElectricityIndex(bill.oldElectricityIndex || 0);
    setNewElectricityIndex(bill.newElectricityIndex || 0);
    setOldWaterIndex(bill.oldWaterIndex || 0);
    setNewWaterIndex(bill.newWaterIndex || 0);
    setRent(bill.rent || 0);
    setNote(bill.note || "");
    getRoomIdByTenantId(bill.tenantId?._id);
    setOpen(true);
  };

  // -------------------- Datatable --------------------
  // reorder columns: tenant, room, month, breakdown, total, status
  const billColumns = ["tenantId.name", "roomId.name", "month", "breakdown", "total", "status"];
  const billActions = (bill) => (
    <>
      <button
        className="hover:bg-accent p-2 rounded-lg"
        onClick={() => handleEditBill(bill)}
      >
        <IconEdit className="text-blue-500" width={20} height={20} stroke={2} />
      </button>
      <button
        className="hover:bg-accent p-2 rounded-lg"
        onClick={() => handleDeleteBill(bill._id)}
      >
        <IconTrash className="text-red-500" width={20} height={20} stroke={2} />
      </button>
    </>
  );

  return (
    <div className="space-y-8">
      <HeaderSection
        title="Bills Management"
        description="Track and manage rental bills"
        add="Create Bill"
        handleOpenDiglog={handleOpenDialog}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <Card className="bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="leading-none font-semibold">All Bills</CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <Datatable data={bills} columns={billColumns} actions={billActions} />
          </CardContent>
        </Card>
      )}

      <DialogCreateBills
        open={open}
        setOpen={setOpen}
        tenantList={tenantList}
        roomList={roomList}
        tenantId={tenantId}
        setTenantId={setTenantId}
        roomId={roomId}
        setRoomId={setRoomId}
        month={month}
        setMonth={setMonth}
        status={status}
        setStatus={setStatus}
        oldElectricityIndex={oldElectricityIndex}
        setOldElectricityIndex={setOldElectricityIndex}
        newElectricityIndex={newElectricityIndex}
        setNewElectricityIndex={setNewElectricityIndex}
        oldWaterIndex={oldWaterIndex}
        setOldWaterIndex={setOldWaterIndex}
        newWaterIndex={newWaterIndex}
        setNewWaterIndex={setNewWaterIndex}
        rent={rent}
        setRent={setRent}
        note={note}
        setNote={setNote}
        handleCreateBill={handleCreateBill}
        filterRoomId={filterRoomId}
        setFilterRoomId={setFilterRoomId}
        getRoomIdByTenantId={getRoomIdByTenantId}
      />
    </div>
  );
};

export default BillsPage;
