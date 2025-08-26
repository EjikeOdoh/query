
import { Tooltip } from "@radix-ui/react-tooltip"
import { type ChartConfig, ChartContainer } from "./ui/chart"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import type { YearStat } from "@/utils/types"


const chartConfig = {
    count: {
        label: "Year",
        color: "#00C950"
    }
} satisfies ChartConfig

interface LineGraphProps {
    data: YearStat[]
}

export default function LineGraph({data}: LineGraphProps) {
    return (
        <ChartContainer config={chartConfig} className="flex-1 min-h-[200px] w-full">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                type={"bump"}
                    dataKey="count"
                    stroke="#00C950"
                    width={20}
                    accumulate="sum"
                    activeDot={true}
                />
            </LineChart>
        </ChartContainer>
    )
}