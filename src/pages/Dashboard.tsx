import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getDashboardStats } from "@/hooks/use-dashboard"
import type { DashStats } from "@/utils/types"
import { useState } from "react"

export default function Dashboard() {
    const [filterYear, setFilterYear] = useState<number>(0)
    const { isLoading, isError, error, data } = getDashboardStats(filterYear)

    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    let dashStats: DashStats = data
    const years: number[] = dashStats.countByYear.map(x => x.year)
    return (
        <div className="text-left">
            <h1 className="font-bold text-2xl">Dashboard stats</h1>
            <ul>
                <li>Year: {dashStats.year}</li>
                {
                    filterYear !== 0 && <li>Target: {dashStats.target}</li>
                }

                <li>Total: {dashStats.totalCount}</li>
                <li>Unique Count: {dashStats.uniqueCount}</li>
                <div>
                    <h2 className="font-semibold">Count By Country</h2>
                    {dashStats.countByCountry.map(stat => (<p key={stat.country}>{stat.country}: {stat.count}</p>))}
                </div>

                <div>
                    <h2 className="font-semibold">Count By Program</h2>
                    {dashStats.countByProgram.map(stat => (<p key={stat.program}>{stat.program}: {stat.count}</p>))}
                </div>

                {
                    filterYear === 0 && (
                        <div>
                            <h2 className="font-semibold">Count By Program</h2>
                            {dashStats.countByYear.map(stat => (<p key={stat.year}>{stat.year}: {stat.count}</p>))}
                        </div>
                    )
                }

            </ul>

            <div className="">
                <Select
                    onValueChange={(value) => { setFilterYear(Number(value)) }} >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={filterYear === 0 ? "All" : filterYear} />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectGroup>
                            <SelectLabel>Pick year</SelectLabel>
                            <SelectItem value="0">All</SelectItem>
                            {
                                years.map(a => (<SelectItem key={a} value={String(a)}>{a}</SelectItem>))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}