import type { ProfileState } from "@/utils/types";
import { SidebarTrigger } from "./ui/sidebar";
import { useSidebar } from "./ui/sidebar";
import { useEffect, useState } from "react";

export default function Header({ label }: { label?: string }) {
    const { open } = useSidebar()
    const [profile, setProfile] = useState<ProfileState>()

    useEffect(() => {
        setProfile(JSON.parse(sessionStorage.getItem('profile') as string))
    }, [])

    const name = profile?.firstName || profile?.staff?.firstName || profile?.volunteer?.firstName || `VF`
    return (
        <div className="pb-20 min-w-full flex mb-10 bg-[#F5F5F5] border-b-2 border-white z-[5]">
            <div
                className={`fixed top-0 h-[80px] bg-[#F5F5F5] px-6 flex items-center justify-between ${open ? "mr-64 w-[calc(100%-256px)]" : "w-[calc(100%-64px)]"
                    }`}
            >

                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <h1 className="font-bold text-[#171717] text-2xl">
                        {label}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    {/* <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#B0E6FF] border-2 border-[#D9F3FF] p-2">
                        <p className="text-xl font-bold text-[#008BCC]">{initials}</p>
                    </div> */}
                    <div className="space-y-[-6px]">
                        <h6 className="text-[#171717] text-lg font-semibold">Welcome, {name}</h6>
                        <small className="text-[#808080] text-[10px]">{profile?.role}</small>
                    </div>
                </div>

            </div>

        </div>
    )
}