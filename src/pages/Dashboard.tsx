import StatCard from "@/components/Card"
import Header from "@/components/Header"
import LineGraph from "@/components/LineChart"
import Map from "@/components/Map"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getDashboardStats } from "@/hooks/use-dashboard"
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


    const years: number[] = data!.countByYear.map(x => x.year)
    return (
        <div className="text-left">
            <Header
                label="Dashboard"
            />
            <div>
                <div>

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
                    <div className="flex items-center gap-6">
                        <StatCard
                            iconColor="#009DE6"
                            value={data!.totalCount}
                            label="Total students impacted"
                            iconBackground="#B0E6FF"
                            cardBackground="#D9F3FF"
                            borderColor="#E6F7FF"
                        />

                        <StatCard
                            iconColor="#8B86B4"
                            value={data!.uniqueCount}
                            label="Total unique students"
                            iconBackground="#E0DEEE"
                            cardBackground="#F0EFF7"
                            borderColor="#F5F4FA"
                        />

                        <StatCard
                            iconColor="#9EB707"
                            value={data!.totalCount - data!.uniqueCount}
                            label="Total returning students"
                            iconBackground="#E6EFB2"
                            cardBackground="#F3F7DA"
                            borderColor="#F7FAE6"
                        />
                    </div>
                </div>
                <div className="flex">
                    <LineGraph />
                    <Map />
                </div>

            </div>


            <h1 className="pt-20 font-bold text-2xl">Dashboard stats</h1>
            <ul>
                <li>Year: {data!.year}</li>
                {
                    filterYear !== 0 && <li>Target: {data!.target}</li>
                }

                <li>Total: {data!.totalCount}</li>
                <li>Unique Count: {data!.uniqueCount}</li>
                <div>
                    <h2 className="font-semibold">Count By Country</h2>
                    {data!.countByCountry.map(stat => (<p key={stat.country}>{stat.country}: {stat.count}</p>))}
                </div>

                <div>
                    <h2 className="font-semibold">Count By Program</h2>
                    {data!.countByProgram.map(stat => (<p key={stat.program}>{stat.program}: {stat.count}</p>))}
                </div>

                {
                    filterYear === 0 && (
                        <div>
                            <h2 className="font-semibold">Count By Program</h2>
                            {data!.countByYear.map(stat => (<p key={stat.year}>{stat.year}: {stat.count}</p>))}
                        </div>
                    )
                }

            </ul>

        </div>
    )
}