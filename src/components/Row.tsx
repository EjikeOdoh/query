
type RowProps = {
    label: string
    value: string
}

export default function Row({ label, value }: RowProps) {
    return (
        <div className="flex items-center gap-14">
            <p className="w-24 font-light text-sm text-[#808080]">{label}</p>
            <p className="flex-1 font-light text-sm text-[#171717]">{value}</p>
        </div>
    )
}