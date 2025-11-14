import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getBills, createBill, deleteBill } from "@/service/api/bills.js";
import HeaderSection from "@/components/HeaderSection";
import Datatable from "@/components/DataTable";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DialogCreateBills from "@/components/DialogCreateBills";
import { getTenants } from "@/service/api/tenants.js";
import { getRooms } from "@/service/api/rooms.js";
const BillsPage = () => {
  const [open, setOpen] = React.useState(false);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleOpenDiglog = () => {
    setTenantId("");
    setRoomId("");
    setStatus("unpaid");
    setOldElectricityIndex(0);
    setNewElectricityIndex(0);
    setOldWaterIndex(0);
    setNewWaterIndex(0);
    setRent(0);
    setNote("");
    setOpen(true);
  };

 useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
        const billsRes = await getBills();
        setBills(billsRes?.data?.data || []);

        const tenantsRes = await getTenants();
        setTenantList(tenantsRes?.data|| []);

        const roomsRes = await getRooms();
        setRoomList(roomsRes?.data?.data || []);

    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Không thể tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };
  const handleCreateBill = async (e) => {
    e.preventDefault(); 
        if (!tenantId || !roomId || !month || rent <= 0) { 
        toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
        return;
    }
    try {
      const newBillData = {
        tenantId: tenantId,
        roomId: roomId,
        month: month,
        status: status,
        breakdown: {
          rent: Number(rent),
          electricity: {
            oldIndex: Number(oldElectricityIndex),
            newIndex: Number(newElectricityIndex),
          },
          water: {
            oldIndex: Number(oldWaterIndex),
            newIndex: Number(newWaterIndex),
          },
        },
        note: note,
      };
      
      await createBill(newBillData);

      toast.success("Tạo hóa đơn thành công!");
      await fetchData(); 
      setOpen(false); 
      
    } catch (error) {
      console.error("Error creating bill:", error);
      toast.error(error?.response?.data?.message || "Lỗi tạo hóa đơn không xác định.");
    }
  };
  
  const handleDeleteBill = async (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này không?");
    if (!confirmed) return;

    try {
      await deleteBill(id);
      toast.success("Xóa hóa đơn thành công!");
      await fetchBills();
    } catch (error) {
      console.error("Error deleting bill:", error);
      toast.error(error?.response?.data?.message || "Lỗi khi xóa hóa đơn.");
    }
  };

  const billColumns = [
    "tenantId.name",
    "roomId.name",
    "month",
    "breakdown",
    "total",
    "status",
  ];

  const billActions = (item) => (
    <>
      <button className="hover:bg-accent p-2 rounded-lg"
      >
        <IconEdit className="text-blue-500" width={20} height={20} stroke={2} />
      </button>
      <button 
        className="hover:bg-accent p-2 rounded-lg"
        onClick={() => handleDeleteBill(item._id || item.id)} 
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
              All Bills
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <Datatable
              data={bills}
              columns={billColumns}
              actions={billActions}
            />
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
      />
    </div>
  );
};

export default BillsPage;