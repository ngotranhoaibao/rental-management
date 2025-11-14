import React, { useEffect, useState } from "react";
import HeaderSection from "@/components/HeaderSection";
import toast from "react-hot-toast";
import Datatable from "@/components/DataTable";
import { Spinner } from "@/components/ui/spinner";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { getTenants } from "@/service/api/tenants";   
import DialogCreateTenants from "@/components/DialogCreateTenants";
const TenantsPage = () => {
  const [tenants, setTenants] = useState([]);  
  const [loading, setLoading] = useState(false);  
  const [open, setOpen] = useState(false);

  const handleOpenDiglog = () => {
    setOpen(true);
  };
  const fetchTenants = async () => {
  try {
    setLoading(true);
    const res = await getTenants(); // res = { success: true, data: [...] }
    
    // ⭐ SỬA: Kiểm tra và gán res?.data
    if (res?.data) { 
      setTenants(res.data); // Gán trực tiếp mảng tenants
    } else {
      // Trường hợp dữ liệu trả về nằm ngoài res.data, ví dụ: res = [...]
      setTenants(res || []);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error fetching tenants"); 
  } finally {
    setLoading(false); 
  }
};

  const tenantColumns = ["name", "phone", "idCard", "roomId.name"];

  const tenantsActions = (item) => (
    <>
      <button className="hover:bg-accent p-2 rounded-lg">
        <IconEdit className="text-blue-500" width={20} height={20} stroke={2} />
      </button>
      <button className="hover:bg-accent p-2 rounded-lg">
        <IconTrash className="text-red-500" width={20} height={20} stroke={2} />
      </button>
    </>
  );

  useEffect(() => {
    fetchTenants();  
  }, []);

  return (
    <div className="space-y-8">
      <HeaderSection
        title="Tenants Management"
        description="Manage your tenants"
        add="Add Tenant"
        placeholder="Search by name or phone..."
        handleOpenDiglog={handleOpenDiglog}
      />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <Datatable
          data={tenants}  
          columns={tenantColumns}  
          actions={tenantsActions}  
        />
        
      )}
      <DialogCreateTenants open={open} setOpen={setOpen}  />
    </div>
  );
};

export default TenantsPage;
