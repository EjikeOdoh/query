
import { Tooltip } from "@radix-ui/react-tooltip"
import { type ChartConfig, ChartContainer } from "./ui/chart"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

const chartData = [
    { year: 2024, count: 1200 },
    { year: 2025, count: 2000 },
    { year: 2026, count: 3200 },
    { year: 2027, count: 1200 },
    { year: 2028, count: 2000 },
    { year: 2029, count: 3200 },
]

const chartConfig = {
    count: {
        label: "Year",
        color: "#00C950"
    }
} satisfies ChartConfig

export default function LineGraph() {
    return (
        <ChartContainer config={chartConfig} className="flex-1 min-h-[200px] w-full">
            <LineChart data={chartData}>
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