
import React from "react";
import DashboardCard from "@/components/DashboardCard";
export default function DashboardPage() {
  return (
    <div className="space-y-8">
    <div><h1 className="text-3xl font-bold text-foreground">Dashboard</h1><p className="text-muted-foreground mt-2">Overview of your rental property management</p></div>
     <DashboardCard />
    </div>
  );
}
