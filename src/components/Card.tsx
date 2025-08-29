import { Flag } from "lucide-react";

type StatCardProps = {
    iconColor: string
    label: string
    value: number
    iconBackground: string
    cardBackground: string
    borderColor: string
}

export default function StatCard({iconColor, label, value, iconBackground, cardBackground, borderColor}: StatCardProps) {
    return (
        <div style={{backgroundColor: cardBackground, borderColor: borderColor}} className="flex flex-1 items-center justify-center gap-3 min-w-full md:min-w-auto h-40 rounded-2xl border-4">
            <div style={{backgroundColor: iconBackground}} className="w-16 h-16 rounded-full flex items-center justify-center">
                <Flag color={iconColor} size={32} />
            </div>
            <div>
                <p className="text-sm font-light">{label}</p>
                <h1 className="text-4xl font-bold">{value}</h1>
            </div>
        </div>
    )
}