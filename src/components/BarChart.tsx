import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CardContent } from "@/components/ui/card";
import type { QuarterGroup } from "@/utils/types";
import { COLORS } from "@/utils/types";


type Props = { data: QuarterGroup[] }
// const COLORS = ["#009DE6", "#8B86B4", "#9EB707", "#D92121"];

export default function GroupedBarChart({ data }: Props) {

  const programKeys = Array.from(
    new Set(
      data.flatMap(item => Object.keys(item).filter(key => key !== "quarter"))
    )
  );

  return (
    <CardContent className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis
            dataKey="quarter"
            tick={{ fontSize: 10, fontWeight: 600, color: "#000" }}
            label={{ value: "QUARTER", position: "insideBottom", offset: 2, fontSize:10 }}
          />

          <YAxis
            tick={{ fontSize: 10, fontWeight: 600, color: "#000" }}
            label={{ value: "COUNT", angle: -90, position: "insideLeft", fontSize:10}}
          />

          <Tooltip formatter={(value: number) => value.toLocaleString()} />
          <Legend verticalAlign="top" height={24} />

          {programKeys.map((program) => (
            <Bar
              key={program}
              dataKey={program}
              fill={COLORS[program]}
              name={program}
              radius={[8, 8, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  );
}