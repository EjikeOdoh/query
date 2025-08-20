import { Outlet } from "react-router";
import type { ProfileState } from "@/utils/types";
import {SidebarProvider} from "@/components/ui/sidebar";
import MySidebar from "@/components/Sidebar";
import { useGetPrograms } from "@/hooks/use-dashboard";

export default function Protected() {

    const accountType: ProfileState = JSON.parse(sessionStorage.getItem("profile") as string)
    const programs = useGetPrograms()

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