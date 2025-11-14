import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getBills } from "@/service/api/bills.js";
import HeaderSection from "@/components/HeaderSection";
import Datatable from "@/components/DataTable";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DialogCreateBills from "@/components/DialogCreateBills";
const BillsPage = () => {
  const [open, setOpen] = React.useState(false);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpenDiglog = () => {
    setOpen(true);
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const res = await getBills();
      setBills(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
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
      <button className="hover:bg-accent p-2 rounded-lg">
        <IconEdit className="text-blue-500" width={20} height={20} stroke={2} />
      </button>
      <button className="hover:bg-accent p-2 rounded-lg">
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
      <DialogCreateBills open={open} setOpen={setOpen} />
    </div>
  );
};

export default BillsPage;
