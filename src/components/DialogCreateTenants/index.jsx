import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

function DialogCreateTenants({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="max-w-lg max-h-[85vh] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="border-b p-6">
            <DialogTitle>Thêm Người Thuê Mới</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 px-6 overflow-y-auto flex-1">
            <div className="space-y-4">
              <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Thông Tin Cơ Bản
              </h3>
              
               <div className="flex gap-4">
                <div className="flex-1 grid gap-2">
                <Label htmlFor="name-1">Họ và Tên *</Label>
                <Input id="name-1" name="name" placeholder="VD: Nguyễn Văn A" />
              </div>
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="phone-1">Số Điện Thoại *</Label>
                  <Input id="phone-1" name="phone" placeholder="0987654321" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="email-1">Email</Label>
                  <Input id="email-1" name="email" placeholder="example@email.com" />
                </div>
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="idCard-1">CMND/CCCD *</Label>
                  <Input
                    id="idCard-1"
                    name="idCard"
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
                <div data-slot="form-item" className="grid gap-2">
                  <Label htmlFor="room-1">Phòng</Label>
                  <Select id="room-1" name="roomId">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chưa gán phòng" />
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
                <div data-slot="form-item" className="grid gap-2">
                  <Label htmlFor="status-1">Trạng Thái</Label>
                  <Select id="status-1" value="active">
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
                <div data-slot="form-item" className="grid gap-2">
                  <Label htmlFor="moveInDate">Ngày Vào Ở</Label>
                  <Input type="date" id="moveInDate" name="moveInDate" />
                </div>
                <div data-slot="form-item" className="grid gap-2">
                  <Label htmlFor="moveOutDate">Ngày Trả Phòng</Label>
                  <Input type="date" id="moveOutDate" name="moveOutDate" />
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-2 border-t pb-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Ghi Chú
              </h3>
              <div data-slot="form-item" className="grid gap-2">
                <Textarea
                  id="note"
                  name="note"
                  placeholder="Ghi chú thêm về người thuê..."
                  className="h-20"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t">
            <Button className="flex-1" type="submit">
              Thêm Người Thuê
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default DialogCreateTenants;
