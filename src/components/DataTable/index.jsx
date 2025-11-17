import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatted } from "@/until/formatMoney";
import { getNestedValue } from "@/until/getNestedValue";

const columnNames = {
  "tenantId.name": "Tenant",
  "roomId.name": "Room",
  month: "Month",
  total: "Total",
  status: "Status",
  price: "Price",
  breakdown: "Breakdown",
  name: "Name",
  idCard: "ID Card",
  phone: "Phone",
};

const DataTable = ({ data, columns, actions }) => {
  const getBreakdown = (item) => (
    <>
      <div>
        Electricity:
        {formatted(
          (item.newElectricityIndex - item.oldElectricityIndex) *
            item.electricityPrice
        )}
      </div>
      <div>
        Water:
        {formatted(
          (item.newWaterIndex - item.oldWaterIndex) * item.waterPrice
        )}
      </div>
      <div>Internet: {formatted(item.internetFee)}</div>
      <div>Rent: {formatted(item.rent)}</div>
    </>
  );

  const isTenantRow = (item) => {
    return Boolean(item?.phone || item?.idCard || item?.email);
  };

  const renderStatusBadge = (status, isBill = false) => {
    const s = (status || "").toString().toLowerCase();

    if (isBill) {
      switch (s) {
        case "paid":
          return (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Paid
            </span>
          );
        case "unpaid":
          return (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
              Unpaid
            </span>
          );
        default:
          return (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              {status || "Chưa xác định"}
            </span>
          );
      }
    }
    switch (s) {
      case "available":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            Còn Trống
          </span>
        );
      case "occupied":
      case "đã thuê":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            Đã Thuê
          </span>
        );
      case "maintenance":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            Bảo Trì
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {status || "Chưa xác định"}
          </span>
        );
    }
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index}>{columnNames[col] || col}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            data.map((item) => {
              const isBillRow = Boolean(item.total || item.breakdown);

              return (
                <TableRow key={item._id || item.id}>
                  {columns.map((col, index) => {
                    const raw = getNestedValue(item, col);

                    if (col === "total") {
                      return (
                        <TableCell key={index}>
                          {formatted(item[col])}
                        </TableCell>
                      );
                    }

                    if (col === "breakdown") {
                      return (
                        <TableCell key={index}>{getBreakdown(item)}</TableCell>
                      );
                    }

                    if (col === "status") {
                      return (
                        <TableCell key={index}>
                          {renderStatusBadge(item[col], isBillRow)}
                        </TableCell>
                      );
                    }

                    if (col === "roomId.name" || col.toLowerCase().includes("room")) {
                      if (isTenantRow(item)) {
                        return (
                          <TableCell key={index}>
                            <span className="text-green-600 font-medium">
                              {raw || "-"}
                            </span>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={index}>
                            <span className="text-black ">{raw || "-"}</span>
                          </TableCell>
                        );
                      }
                    }

                    if (col === "tenantId.name" || col === "name") {
                      return (
                        <TableCell key={index}>
                          <span className="font-semibold text-black">{raw || "-"}</span>
                        </TableCell>
                      );
                    }

                    return <TableCell key={index}>{raw ?? "-"}</TableCell>;
                  })}
                  <TableCell>{actions && actions(item)}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
