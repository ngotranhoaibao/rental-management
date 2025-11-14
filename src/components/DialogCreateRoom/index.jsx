import React, { useState } from "react";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

function DialogCreateRoom({
  open,
  setOpen,
  nameRoom,
  setNameRoom,
  priceRoom,
  setPriceRoom,
  statusRoom,
  setStatusRoom,
  descriptionRoom,
  setDescriptionRoom,
  handleCreateRoom,
  handleUpdateRoom, 
  isEditing,
}) {
    const handleSubmit = isEditing ? handleUpdateRoom : handleCreateRoom;
    const dialogTitle = isEditing ? "Chỉnh Sửa Phòng" : "Tạo Phòng Mới";
    const buttonText = isEditing ? "Cập Nhật Phòng" : "Tạo phòng mới";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="max-w-lg max-h-[85vh] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="border-b p-6">
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 px-6 overflow-y-auto flex-1">
            <div className="grid gap-2">
              <Label htmlFor="name-1">Tên Phòng *</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="VD: Phòng 101"
                required
                value={nameRoom}
                onChange={(e) => setNameRoom(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 grid gap-2">
                <Label htmlFor="price-1">Giá Thuê/Tháng *</Label>
                <Input
                  id="price-1"
                  name="price"
                  type="number"
                  placeholder="0"
                  required
                    value={priceRoom}
                    onChange={(e) => setPriceRoom(Number(e.target.value))}
                />
              </div>
              <div className="flex-1 grid gap-2">
                <Label htmlFor="status-1">Trạng Thái</Label>
                <Select id="status-1" value={statusRoom} onValueChange={setStatusRoom}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Còn trống" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectGroup>
                      <SelectItem value="occupied">Đã Thuê</SelectItem>
                      <SelectItem value="available">Còn Trống</SelectItem>
                      <SelectItem value="maintenance">Bảo Trì</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="describe-1">Mô Tả</Label>
              <Textarea
                value={descriptionRoom}
                onChange={(e) => setDescriptionRoom(e.target.value)}
                className="h-28"
                id="describe-1"
                name="description"
                placeholder="Mô tả về phòng: diện tích, tiện nghi..."
              />
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t">
            <Button  className="flex-1" onClick={handleSubmit}>
              {buttonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default DialogCreateRoom;
