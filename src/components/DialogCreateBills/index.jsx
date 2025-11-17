import React, { useEffect } from "react";
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

function DialogCreateBills({
  open,
  setOpen,
  tenantId,
  setTenantId,
  roomId,
  setRoomId,
  month,
  setMonth,
  tenantList,
  roomList,
  status,
  setStatus,
  handleCreateBill,
  oldElectricityIndex,
  setOldElectricityIndex,
  newElectricityIndex,
  setNewElectricityIndex,
  oldWaterIndex,
  setOldWaterIndex,
  newWaterIndex,
  setNewWaterIndex,
  rent,
  setRent,
  note,
  setNote,
  getRoomIdByTenantId,
  filterRoomId,
  setFilterRoomId,
  editingId, 
}) {
  useEffect(() => {
    if (open && !month) {
      const currentMonth = new Date().toISOString().slice(0, 7);
      setMonth(currentMonth);
    }
  }, [open, setMonth, month]);

  const title = editingId ? "Cập Nhật Hóa Đơn" : "Tạo Hóa Đơn Mới";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg max-h-[85vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="border-b p-6">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 px-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Thông Tin Cơ Bản
            </h3>
            <div className="flex gap-4">
              <div className="flex-1 grid gap-2">
                <Label htmlFor="tenant-1">Người Thuê *</Label>
                <Select
                  value={tenantId}
                  onValueChange={(value) => {
                    setTenantId(value);
                    getRoomIdByTenantId(value);
                  }}
                  id="tenant-1"
                  name="tenantId"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn người thuê" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {tenantList.length > 0 ? (
                        tenantList.map((tenant) => (
                          <SelectItem key={tenant._id} value={tenant._id}>
                            {tenant.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-tenant-data" disabled>
                          Không có người thuê
                        </SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 grid gap-2">
                <Label htmlFor="room-1">Phòng *</Label>
                <Select
                  value={roomId}
                  onValueChange={(value) => setRoomId(value)}
                  id="room-1"
                  name="roomId"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {filterRoomId.length > 0 ? (
                        filterRoomId.map((room) => (
                          <SelectItem key={room._id} value={room._id}>
                            {room.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-room-data" disabled>
                          Không có phòng
                        </SelectItem>
                      )}
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
                  value={oldElectricityIndex}
                  onChange={(e) => setOldElectricityIndex(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newElectricityIndex">Chỉ Số Mới (kWh)</Label>
                <Input
                  type="number"
                  id="newElectricityIndex"
                  value={newElectricityIndex}
                  onChange={(e) => setNewElectricityIndex(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="oldWaterIndex">Chỉ Số Cũ (m³)</Label>
                <Input
                  type="number"
                  id="oldWaterIndex"
                  value={oldWaterIndex}
                  onChange={(e) => setOldWaterIndex(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newWaterIndex">Chỉ Số Mới (m³)</Label>
                <Input
                  type="number"
                  id="newWaterIndex"
                  value={newWaterIndex}
                  onChange={(e) => setNewWaterIndex(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4 pt-2 border-t pb-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Thanh Toán
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="rent">Tiền Thuê *</Label>
                <Input
                  type="number"
                  id="rent"
                  value={rent}
                  onChange={(e) => setRent(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Trạng Thái *</Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value)}
                  id="status"
                >
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
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ghi chú thêm về hóa đơn..."
              className="h-20"
            />
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <Button className="flex-1" onClick={handleCreateBill}>
            {editingId ? "Cập Nhật Hóa Đơn" : "Tạo Hóa Đơn Mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogCreateBills;
