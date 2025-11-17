import React from "react";
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
import { Textarea } from "../ui/textarea";

function DialogCreateTenants({
  open,
  setOpen,
  formData,
  setFormData,
  handleSaveTenant,
  editingId,
  rooms,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="border-b p-6">
            <DialogTitle>
              {formData._id ? "Cập nhật Người Thuê" : "Thêm Người Thuê"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 px-6 overflow-y-auto flex-1">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Thông Tin Cơ Bản
              </h3>
              <div className="flex gap-4">
                <div className="flex-1 grid gap-2">
                  <Label>Họ và Tên *</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="VD: Nguyễn Văn A"
                  />
                </div>
                <div className="flex-1 grid gap-2">
                  <Label>Số Điện Thoại *</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0987654321"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 grid gap-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                  />
                </div>
                <div className="flex-1 grid gap-2">
                  <Label>CMND/CCCD *</Label>
                  <Input
                    name="idCard"
                    value={formData.idCard}
                    onChange={handleChange}
                    placeholder="079123456789"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-2 border-t">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Phòng & Trạng Thái
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Phòng</Label>
                  <Select
                    name="roomId"
                    value={formData.roomId}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, roomId: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn phòng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {rooms.map((room) => (
                          <SelectItem key={room._id} value={room._id}>
                            {room.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Trạng Thái</Label>
                  <Select
                    name="status"
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="active">Đang Thuê</SelectItem>
                        <SelectItem value="moved_out">Đã Trả Phòng</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-2 border-t pb-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Ngày Tháng
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Ngày Vào Ở</Label>
                  <Input
                    type="date"
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Ngày Trả Phòng</Label>
                  <Input
                    type="date"
                    name="moveOutDate"
                    value={formData.moveOutDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t pb-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Ghi Chú
              </h3>
              <Textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="h-20"
                placeholder="Ghi chú thêm về người thuê..."
              />
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t">
            <Button className="flex-1" onClick={handleSaveTenant}>
              {editingId ? "Cập nhật Người Thuê" : "Thêm Người Thuê"}
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}

export default DialogCreateTenants;
