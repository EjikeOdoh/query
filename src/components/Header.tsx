import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
    return (
        <div className="pb-20 min-w-full mb-5">
            <div className="fixed h-[80px] w-full px-6 flex items-center justify-between bg-[#FFFFFF] z-[5]">
                <SidebarTrigger />
                Header
            </div>
        </div>
    )
}