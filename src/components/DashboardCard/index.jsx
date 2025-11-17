import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  IconAlertCircle,
  IconFileInvoice,
  IconHome,
  IconUsers,
} from "@tabler/icons-react";
export default function DashboardCard({ stats, loading }) {
  const {
    totalRooms = 0,
    totalTenants = 0,
    totalBillsAmount = 0,
    unpaidBillsCount = 0,
  } = stats || {};
  const formatCurrency = (value) => {
    const num = Number(value || 0);
    try {
      return num.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    } catch {
      return num;
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tổng Số Phòng</CardTitle>
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <IconHome className="h-5 w-5" stroke={2} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRooms}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tổng Người Thuê</CardTitle>
          <div className="p-2 rounded-lg bg-green-100 text-green-600">
            <IconUsers className="h-5 w-5" stroke={2} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTenants}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tổng Hóa Đơn</CardTitle>
          <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
            <IconFileInvoice className="h-5 w-5" stroke={2} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            đ{formatCurrency(totalBillsAmount)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Hóa Đơn Chưa Thanh Toán
          </CardTitle>
          <div className="p-2 rounded-lg bg-red-100 text-red-600">
            <IconAlertCircle className="h-5 w-5" stroke={2} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unpaidBillsCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}
