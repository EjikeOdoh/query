import { getDashboardStats } from "@/hooks/use-dashboard"
import type { DashStats } from "@/utils/types"
import { useState } from "react"

export default function Dashboard() {
    const [filterYear, setFilterYear] = useState<number>(0)
    const {isLoading, isError, error, data} = getDashboardStats(filterYear)

    if(isLoading) {
        return (
            <div>Loading</div>
        )
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    let dashStats: DashStats = data
    return (
    <div className="text-left">
        <h1 className="font-bold text-2xl">Dashboard stats</h1>
        <ul>
            <li>Year: {dashStats.year}</li>
            <li>Target: {dashStats.target}</li>
            <li>Total: {dashStats.totalCount}</li>
            <li>Unique Count: {dashStats.uniqueCount}</li>
            <div>
                <h2 className="font-semibold">Count By Country</h2>
                {dashStats.countByCountry.map(stat=>(<p key={stat.country}>{stat.country}: {stat.count}</p>))}
            </div>

            <div>
            <h2 className="font-semibold">Count By Program</h2>
                {dashStats.countByProgram.map(stat=>(<p key={stat.program}>{stat.program}: {stat.count}</p>))}
            </div>

        </ul>
    </div>
)
}