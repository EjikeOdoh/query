import { Dot } from "lucide-react";

function Active() {
    return (
        <div className="h-7 flex items-center w-fit border border-[#E5E5E5] px-4 rounded-full">
            <Dot size={48} color="#00B548" className="ml-[-20px]" />
            <label className="text-[#808080] text-[10px] ml-[-10px]">Active</label>
        </div>
    )
}

function Inactive() {
    return (
        <div className="h-7 flex items-center w-fit border border-[#E5E5E5] px-4 rounded-full">
            <Dot size={48} color="#E22831" className="ml-[-20px]" />
            <label className="text-[#808080] text-[10px] ml-[-10px]">Inactive</label>
        </div>
    )
}

export {Active, Inactive}