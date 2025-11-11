import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../AppSidebar";
const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <Header></Header>

        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
