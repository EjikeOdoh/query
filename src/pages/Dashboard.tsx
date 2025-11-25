import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Users, Target, Layers, PieChart as PieIcon, RefreshCw, BarChart2Icon, Map } from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RTooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import Container from "@/components/Container";
import { useDashboardStats, useGetPrograms } from "@/hooks/use-dashboard";
import { Progress } from "@/components/ui/progress";
import CountryTable from "@/components/CountryTable";
import { SpinnerCustom } from "@/components/Loader";
import ErrorLayout from "@/components/ErrorLayout";



export default function Dashboard() {
    const [filterYear, setFilterYear] = useState<number>(0)
    const { isLoading, isError, error, data, } = useDashboardStats(filterYear)
    useGetPrograms()

    if (isLoading) {
        return (
            <Container
                label="Dashboard">
                <SpinnerCustom />
            </Container>
        )
    }

    if (isError) {
        return <ErrorLayout label="Dashboard" text={error.message} />
    }

    if (data) {
        const years: number[] = data!.countByYear.map(x => x.year).sort((a, b) => b - a);
        const includesYear: boolean = years.includes(filterYear)
        const programData = data?.countByProgram.map(p => ({
            ...p,
            count: Number(p.count)
        }));
        const COLORS = ["#009DE6", "#8B86B4", "#9EB707", "#D92121"];
        const countryCount = data?.countByCountry.length || 0;
        const currentYear = data?.countByYear.find(x => x.year === filterYear) || { count: 0 }
    
        return (
            <Container
                label="Dashboard"
                bgColor="transparent"
                padding={0}
            >
                <div className="space-y-10">
                    <Card className="px-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 bg-white pb-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <Select
                                    value={includesYear ? filterYear.toString() : '0'}
                                    onValueChange={(value) => { setFilterYear(Number(value)) }}
                                >
                                    <SelectTrigger className="w-[140px]"><SelectValue placeholder={includesYear ? filterYear : 'All'} /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">All</SelectItem>
                                        {
                                            years.map(a => (<SelectItem key={a} value={String(a)}>{a}</SelectItem>))
                                        }
                                    </SelectContent>
                                </Select>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="default" className="gap-2 border-2" onClick={() => { setFilterYear(0) }}>
                                                <RefreshCw className="h-4 w-4" /> Reset
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Reset all filters</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
    
                        {/* KPI cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <Card className="rounded-2xl bg-[#D9F3FF] shadow-sm h-40">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                        <CardTitle className="text-sm font-medium">Total students impacted</CardTitle>
                                        <Users className="h-5 w-5" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{data?.totalCount}</div>
                                        <p className="text-xs text-muted-foreground">Across {countryCount} {countryCount === 1 ? 'country' : "countries"}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                                <Card className="rounded-2xl bg-[#F0EFF7] shadow-sm h-40">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                        <CardTitle className="text-sm font-medium">Unique Participants</CardTitle>
                                        <Layers className="h-5 w-5" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{data?.uniqueCount}</div>
                                        <p className="text-xs text-muted-foreground">De-duplicated count</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <Card className="rounded-2xl bg-[#F3F7DA] shadow-sm h-40">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                        <CardTitle className="text-sm font-medium">Target</CardTitle>
                                        <Target className="h-5 w-5" />
                                    </CardHeader>
                                    <CardContent>
                                        {data!.target === 0 ? (
                                            <p className="text-xs text-muted-foreground mb-2">
                                                Please select a year with a defined target.
                                            </p>
                                        ) : (
                                            <>
                                                <div className="text-3xl font-bold">
                                                    {currentYear?.count} / {data?.target}
                                                </div>
                                                <p className="text-xs text-muted-foreground mb-2">
                                                    Progress toward the participation goal
                                                </p>
                                                <Progress
                                                    value={(data!.target > 0) ? (currentYear!.count / data!.target) > 1 ? 100 : ((currentYear!.count / data!.target) * 100) : 0}
                                                    className="h-2"
                                                />
                                            </>
                                        )}
                                    </CardContent>
    
                                </Card>
                            </motion.div>
                        </div>
                    </Card>
    
                    {/* Charts  */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base text-[#171717] font-semibold flex items-center gap-2">
                                    <PieIcon className="h-4 w-4" /> Program Mix
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="h-[320px]">
                                <ResponsiveContainer width="100%" height="90%">
                                    <PieChart>
                                        <Pie
                                            data={programData}
                                            dataKey="count"
                                            nameKey="program"
                                            innerRadius={0}
                                            outerRadius={100}
                                        >
                                            {programData?.map((_, idx) => (
                                                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <RTooltip formatter={(v, n) => [v as number, n as string]} />
                                        <Legend
                                            verticalAlign="top"
                                            height={36}
                                            formatter={(value) => {
                                                const programItem = programData?.find(p => p.program === value);
                                                return <span className="text-xs font-semibold mr-2">{programItem?.program}: {programItem?.count}</span>;
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
    
                        <Card className="rounded-2xl shadow-sm lg:col-span-2">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base text-[#171717] font-semibold flex items-center gap-2">
                                    <BarChart2Icon className="h-4 w-4" />
                                    Yearly Impact</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[320px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data?.countByYear} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" tick={{ fontSize: 10 }} label={{
                                            value: 'Year',
                                            position: 'bottom',
                                            offset: -10,   // adjust as needed to avoid clipping
                                            fontSize: 10
                                        }} />
                                        <YAxis
                                            tick={{ fontSize: 10 }}
                                            label={{
                                                value: 'Count', angle: -90,
                                                position: 'insideLeft', fontSize: 10
                                            }}
                                            domain={[0, Math.ceil(data!.highestYearlyCount * 1.1)]}
                                        />
                                        <RTooltip formatter={(v) => (v as number)} />
                                        <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#009DE6" height={100} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
    
                    {/* Country Breakdown table only */}
                    <Card className="rounded-2xl shadow-sm">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base text-[#171717] font-semibold flex items-center gap-2">
                                    <Map />
                                    Country Breakdown</CardTitle>
                                <Badge variant="secondary" className="text-xs">Year: {filterYear || "All"}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CountryTable data={data?.countByCountry || []} year={filterYear} />
                        </CardContent>
                    </Card>
                </div>
            </Container>
        );

    }
}
