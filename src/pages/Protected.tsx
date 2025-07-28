import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import type { ProfileState } from "@/utils/types";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MySidebar from "@/components/Sidebar";
import { EyeClosedIcon } from "lucide-react";

export default function Protected() {

    const accountType: ProfileState = JSON.parse(sessionStorage.getItem("profile") as string)

    return (
        <div>
            <SidebarProvider>
                <MySidebar profile={accountType} />
                
                <div className="w-full">
                    <Outlet />
                </div>

        
            </SidebarProvider>
        </div>
    )
}