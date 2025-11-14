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
};

const DataTable = ({ data, columns, actions }) => {
  const getBreakdown = (item) => {
    return (
      <>
        <div>
          Electricity:{" "}
          {formatted(
            (item.newElectricityIndex - item.oldElectricityIndex) *
              item.electricityPrice
          )}
        </div>
        <div>
          Water:{" "}
          {formatted(
            (item.newWaterIndex - item.oldWaterIndex) * item.waterPrice
          )}
        </div>
        <div>Internet: {formatted(item.internetFee)}</div>
        <div>Rent: {formatted(item.rent)}</div>
      </>
    );
  };

  const renderStatus = (status) => {
    switch (status) {
      case "available":
        return "Còn trống";
      case "occupied":
        return "Đã thuê";
      case "maintenance":
        return "Bảo trì";
      default:
        return status || "Chưa xác định";
    }
  };

  return (
    <div className="rounded-lg border">
      <Table className=" ">
      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <TableHead key={index}>{columnNames[col] || col}</TableHead>
          ))}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.length > 0 ? (
          data.map((item) => (
            <TableRow key={item._id || item.id}>
              {columns.map((col, index) => (
                <TableCell key={index}>
                  {col === "total"
                    ? formatted(item[col])
                    : col === "breakdown"
                    ? getBreakdown(item)
                    : col === "status"
                    ? renderStatus(item[col])
                    : getNestedValue(item, col) || "-"}
                </TableCell>
              ))}
              <TableCell>{actions && actions(item)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length + 1} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  );
};

export default DataTable;
