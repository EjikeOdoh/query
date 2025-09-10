import { Outlet } from "react-router";
import type { ProfileState } from "@/utils/types";
import { SidebarProvider } from "@/components/ui/sidebar";
import MySidebar from "@/components/Sidebar";
import { useGetPrograms } from "@/hooks/use-dashboard";
import Modal from "@/components/Dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/utils/fn";

export default function Protected() {

    const accountType: ProfileState = JSON.parse(sessionStorage.getItem("profile") as string)
    const programs = useGetPrograms()
    void programs

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false)

    function openLogoutModal() {
        setIsLogoutModalOpen(true)
    }

    function closeLogoutModal() {
        setIsLogoutModalOpen(false)
    }

    return (
        <div>
            <SidebarProvider>
                <MySidebar
                    profile={accountType}
                    logout={openLogoutModal}
                />

                <div className="w-full">
                    <Outlet />
                </div>
            </SidebarProvider>
            <Modal isOpen={isLogoutModalOpen} onClose={closeLogoutModal}>
                <div className="space-y-10">
                    <div className="space-y-8">
                        <LogOut size={90} className="mx-auto" />
                        <div>
                            <h3 className="font-bold text-3xl text-center">Logout</h3>
                            <p className="font-light text-center">Are you sure you want to logout?</p>
                        </div>

                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant='outline' className="flex-1" onClick={closeLogoutModal}>No</Button>
                        <Button variant="destructive" className="flex-1" onClick={logout}>Yes, Logout</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}