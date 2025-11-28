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
  
  // Your raw data
  const rawData = {
    programs: {
      ASCG: [
        { quarter: 1, count: 535 },
        { quarter: 2, count: 670 },
        { quarter: 3, count: 3276 },
      ],
      CBC: [
        { quarter: 2, count: 33 },
        { quarter: 3, count: 42 },
      ],
    },
  };
  
  // Transform into array suitable for Recharts stacked bar
  const chartData = [
    // Quarter 1
    {
      quarter: "Q1",
      ASCG: 535,
      CBC: 0, // or undefined if you prefer no stack
    },
    // Quarter 2
    {
      quarter: "Q2",
      ASCG: 670,
      CBC: 33,
    },
    // Quarter 3
    {
      quarter: "Q3",
      ASCG: 3276,
      CBC: 42,
    },
  ];
  
  export default function StackedProgramChart() {
    return (
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            
            <XAxis 
              dataKey="quarter" 
              tick={{ fontSize: 12 }}
              label={{ value: "Quarter", position: "insideBottom", offset: -5 }}
            />
            
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ value: "Count", angle: -90, position: "insideLeft" }}
            />
            
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Legend verticalAlign="top" height={36} />
  
            {/* Stacked bars */}
            <Bar 
              dataKey="ASCG" 
              stackId="a" 
              fill="#009DE6" 
              radius={[0, 0, 0, 0]} 
              name="ASCG"
            />
            <Bar 
              dataKey="CBC" 
              stackId="a" 
              fill="#FF6B6B" 
              radius={[8, 8, 0, 0]}   // rounded top only
              name="CBC"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    );
  }