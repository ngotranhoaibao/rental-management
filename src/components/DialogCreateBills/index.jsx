import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function DialogCreateBills({ open, setOpen }) {
  const [status, setStatus] = useState("unpaid");
  const [month, setMonth] = useState("");  

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    setMonth(currentMonth);
  }, [open]);  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="max-w-lg max-h-[85vh] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="border-b p-6">
            <DialogTitle>Tạo Hóa Đơn Mới</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 px-6 overflow-y-auto flex-1">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Thông Tin Cơ Bản
              </h3>
              <div className="flex gap-4">
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="tenant-1">Người Thuê *</Label>
                  <Select id="tenant-1" name="tenantId">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn người thuê" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Van">Van</SelectItem>
                        <SelectItem value="thanh">Thanh</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="room-1">Phòng *</Label>
                  <Select id="room-1" name="roomId">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn phòng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Phòng 103">Phòng 103</SelectItem>
                        <SelectItem value="Phòng 102">Phòng 102</SelectItem>
                        <SelectItem value="Phòng 101">Phòng 101</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="month-1">Tháng *</Label>
                  <Input
                    type="month"
                    id="month-1"
                    name="month"
                    value={month} 
                    onChange={(e) => setMonth(e.target.value)}  
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-2 border-t">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Chỉ Số Điện Nước
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="oldElectricityIndex">Chỉ Số Cũ (kWh)</Label>
                  <Input
                    type="number"
                    id="oldElectricityIndex"
                    name="oldElectricityIndex"
                    defaultValue="0"
                  />
                  <p className="text-muted-foreground text-sm">₫3.000/kWh</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newElectricityIndex">Chỉ Số Mới (kWh)</Label>
                  <Input
                    type="number"
                    id="newElectricityIndex"
                    name="newElectricityIndex"
                    defaultValue="0"
                  />
                  <p className="text-muted-foreground text-sm">₫3.000/kWh</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="oldWaterIndex">Chỉ Số Cũ (m³)</Label>
                  <Input
                    type="number"
                    id="oldWaterIndex"
                    name="oldWaterIndex"
                    defaultValue="0"
                  />
                  <p className="text-muted-foreground text-sm">₫15.000/m³</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newWaterIndex">Chỉ Số Mới (m³)</Label>
                  <Input
                    type="number"
                    id="newWaterIndex"
                    name="newWaterIndex"
                    defaultValue="0"
                  />
                  <p className="text-muted-foreground text-sm">₫15.000/m³</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-2 border-t pb-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Thanh Toán
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2 w-full">
                  <Label htmlFor="rent">Tiền Thuê Phòng *</Label>
                  <Input
                    type="number"
                    id="rent"
                    name="rent"
                    defaultValue="0"
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="status">Trạng Thái *</Label>
                  <Select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="paid">Đã Thanh Toán</SelectItem>
                        <SelectItem value="unpaid">Chưa Thanh Toán</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-2 border-t pb-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Ghi Chú
              </h3>
              <div className="grid gap-2">
                <Textarea
                  id="note"
                  name="note"
                  placeholder="Ghi chú thêm về hóa đơn..."
                  className="h-20"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t">
            <Button className="flex-1" type="submit">
              Tạo Hóa Đơn Mới
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default DialogCreateBills;
