import React, { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import { getRooms } from "@/service/api/rooms";
import { getTenants } from "@/service/api/tenants";
import { getBills } from "@/service/api/bills";
import HeaderSection from "@/components/HeaderSection";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalTenants: 0,
    totalBillsAmount: 0,
    unpaidBillsCount: 0,
  });
  const [loading, setLoading] = useState(false);

  const safeExtractArray = (res) => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    return [];
  };

  const computeBillTotal = (b) => {
    const maybeTotal = Number(b?.total ?? b?.amount ?? b?.totalAmount);
    if (!Number.isNaN(maybeTotal) && maybeTotal !== 0) return maybeTotal;
    const oldEl = Number(b.oldElectricityIndex ?? 0);
    const newEl = Number(b.newElectricityIndex ?? 0);
    const oldW = Number(b.oldWaterIndex ?? 0);
    const newW = Number(b.newWaterIndex ?? 0);
    const electricityPrice = Number(
      b.electricityPrice ?? b?.roomId?.electricityPrice ?? 0
    );
    const waterPrice = Number(b.waterPrice ?? b?.roomId?.waterPrice ?? 0);
    const internetFee = Number(b.internetFee ?? 0);
    const rentVal = Number(b.rent ?? 0);

    const electricityCost = Math.max(0, newEl - oldEl) * electricityPrice;
    const waterCost = Math.max(0, newW - oldW) * waterPrice;
    const total = electricityCost + waterCost + internetFee + rentVal;
    return total;
  };

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const [roomsRes, tenantsRes, billsRes] = await Promise.all([
        getRooms(),
        getTenants(),
        getBills(),
      ]);

      const rooms = safeExtractArray(roomsRes);
      const tenants = safeExtractArray(tenantsRes);
      const bills = safeExtractArray(billsRes);
      const totalBillsAmount = bills.reduce((sum, b) => {
        const t = computeBillTotal(b) || 0;
        return sum + t;
      }, 0);
      const unpaidBillsCount = bills.filter((b) => {
        if (typeof b?.status === "string") {
          const s = b.status.toLowerCase();
          return s === "unpaid" || s === "pending";
        }
        if (typeof b?.paid === "boolean") return b.paid === false;
        if (typeof b?.paymentStatus === "string") {
          const s = b.paymentStatus.toLowerCase();
          return s === "unpaid" || s === "pending";
        }
        return false;
      }).length;

      setStats({
        totalRooms: rooms.length,
        totalTenants: tenants.length,
        totalBillsAmount,
        unpaidBillsCount,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-8">
       <HeaderSection
        title="Dashboard"
        description="Overview of your rental property management"
        
      />
      <DashboardCard stats={stats} loading={loading} />
    </div>
  );
}
