
type RowProps = {
    label: string
    value?: string | null,
}

export default function Row({ label, value }: RowProps) {
    return (
        <div className="flex items-center gap-14">
            <p className="w-36 font-light text-sm text-[#808080]">{label}</p>
            {
                !!value ? 
                <p className="flex-1 font-light text-sm text-[#171717]">{value}</p>
                : <span className="flex-1 font-light text-sm text-[#171717] italic">Not provided</span>
            }
         
        </div>
    )
}