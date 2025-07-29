import { SidebarTrigger } from "./ui/sidebar";

export default function Header({label}:{label?:string}) {
    return (
        <div className="pb-20 min-w-full mb-5">
            <div className="fixed h-[80px] w-full px-6 flex items-center bg-[#FFFFFF] z-[5] gap-2">
                <SidebarTrigger />
                <h1 className="font-bold text-[#171717] text-2xl">
                    {label}
                </h1>
            </div>
        </div>
    )
}