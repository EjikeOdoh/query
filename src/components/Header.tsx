import type { ProfileState } from "@/utils/types";
import { SidebarTrigger } from "./ui/sidebar";
import { useSidebar } from "./ui/sidebar";
import { useEffect, useState } from "react";

export default function Header({ label }: { label?: string }) {
    const { open, isMobile } = useSidebar()
    const [profile, setProfile] = useState<ProfileState>()

    useEffect(() => {
        setProfile(JSON.parse(sessionStorage.getItem('profile') as string))
    }, [])

    const name = profile?.firstName || profile?.staff?.firstName || profile?.volunteer?.firstName || `VF`
    return (
        <div className="pb-20 min-w-full flex mb-10 bg-[#F5F5F5] border-b-2 border-white z-[5]">
            <div
                className={`fixed top-0 h-[80px] bg-[#F5F5F5] px-6 flex items-center justify-between ${!isMobile && (open) ? "mr-64 w-[calc(100%-256px)]" : isMobile ? "w-full":"w-[calc(100%-64px)]"
                    }`}
            >

                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <h1 className="font-bold text-[#171717] text-2xl">
                        {label}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                        <h6 className="text-[#171717] text-lg font-semibold">Welcome, {name}</h6>
                        <small className="text-[#808080] text-[10px]">{profile?.role}</small>
                    </div>
                </div>

            </div>

        </div>
    )
}