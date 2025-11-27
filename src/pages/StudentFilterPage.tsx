import Container from "@/components/Container";
import { SpinnerCustom } from "@/components/Loader";
import StudentTable from "@/components/Table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useGetFilteredStudents } from "@/hooks/use-students";
import type { ParticipationFilterDto } from "@/utils/types";
import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { motion } from 'framer-motion'
import { CalendarFold, ChevronLeft, Flag, Users } from "lucide-react";
import ErrorLayout from "@/components/ErrorLayout";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StudentFilterPage() {
    const { state } = useLocation()

    const [input, setInput] = useState<ParticipationFilterDto>({
        country: state.country,
        year: state.year,
        page: 1,
        limit: 10,

    })

    const { isLoading, isError, data, error } = useGetFilteredStudents(input)

    function selectStudent(id: number) {
        alert(id)
    }


    if (isLoading) {
        return (
            <Container label="Students Filter">
                <SpinnerCustom />
            </Container>
        )
    }

    if (isError) {
        return <ErrorLayout label="Students Filters" text={error.message} />
    }


    if (data) {
        return (
            <Container
                label="Filters"
                bgColor="transparent"
                padding={0}
            >
                <div className="space-y-10">
                    <Card className="px-6">
                        <div>
                            <NavLink
                                to="/"
                                className="flex items-center gap-2 font-light text-xs text-[#171717]"
                            // state={state.query}
                            >
                                <ChevronLeft color="#171717" size={14} />
                                Back to Dashboard
                            </NavLink>
                        </div>
                        {/* KPI cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <Card className="rounded-2xl bg-[#D9F3FF] shadow-sm h-40">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                        <CardTitle className="text-sm font-medium">Country</CardTitle>

                                        <Flag className="h-5 w-5" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{input.country}</div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                                <Card className="rounded-2xl bg-[#F0EFF7] shadow-sm h-40">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                        <CardTitle className="text-sm font-medium">Year</CardTitle>
                                        <CalendarFold className="h-5 w-5" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">
                                            {input.year ? input.year : "Since 2014"
                                            }</div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <Card className="rounded-2xl bg-[#F3F7DA] shadow-sm h-40">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                        <CardTitle className="text-sm font-medium">Total Count</CardTitle>
                                        <Users className="h-5 w-5" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">
                                            {data.meta.total}
                                        </div>
                                    </CardContent>

                                </Card>
                            </motion.div>
                        </div>
                    </Card>

                    <Card className="px-6 py-10">
                        <StudentTable
                            data={data?.data}
                            remove={selectStudent}
                            filter={true}
                            source="filter"
                            query={input.page?.toString()}
                        />
                        <div className="flex flex-col md:flex-row gap-5 justify-between items-baseline">
                            <div className="flex items-center gap-5">
                                <Select onValueChange={(value) => {
                                    setInput({
                                        ...input, limit: Number(value)
                                    })
                                }} >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder={input.limit} />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            <SelectLabel>Rows per page</SelectLabel>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="20">20</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                            <SelectItem value="100">100</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm font-light">Page {input.page} of {data.meta.totalPages}</p>
                            </div>
                            <div className="w-fit">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem className={`text-[#808080]`}>
                                            <PaginationPrevious
                                                isActive={data.meta.hasPreviousPage}
                                                onClick={() => {
                                                    if (data.meta.hasPreviousPage) {
                                                        setInput({ ...input, page: input.page! - 1 })
                                                    }
                                                }}
                                            />
                                        </PaginationItem>
                                        {data.meta.totalPages <= 3 ?
                                            Array.from({ length: data.meta.totalPages }).map((_, i) => i + 1).map(x => (<PaginationItem
                                                key={x}>
                                                <PaginationLink
                                                    className={`text-[#808080] ${x === input.page ? 'text-[#009DE6] bg-[#D9F3FF]' : undefined}`}
                                                    isActive={x === input.page}
                                                    onClick={() => setInput({ ...input, page: x })}
                                                >{x}</PaginationLink>
                                            </PaginationItem>)) :
                                            [1, 2, 3].map(x => (<PaginationItem
                                                key={x}>
                                                <PaginationLink
                                                    className={`text-[#808080] ${x === input.page ? 'text-[#009DE6] bg-[#D9F3FF]' : undefined}`}
                                                    isActive={x === input.page}
                                                    onClick={() => setInput({ ...input, page: x })}
                                                >{x}</PaginationLink>
                                            </PaginationItem>))
                                        }
                                        {
                                            data.meta.totalPages > 3 && (
                                                <PaginationItem
                                                >
                                                    <PaginationLink
                                                        className={`text-[#808080]  ${!data.meta.hasNextPage ? 'text-[#009DE6] bg-[#D9F3FF]' : undefined}`}
                                                        // isActive={x === meta.page}
                                                        onClick={() => setInput({ ...input, page: data.meta.totalPages })}
                                                    >{data.meta.totalPages}</PaginationLink>
                                                </PaginationItem>
                                            )
                                        }

                                        <PaginationItem className="text-[#808080]">
                                            <PaginationNext
                                                isActive={data.meta.hasNextPage}
                                                onClick={() => {
                                                    if (data.meta.hasNextPage) {
                                                        setInput({ ...input, page: input.page! + 1 })
                                                    }
                                                }}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>

                    </Card>
                </div>
            </Container>
        )
    }
}
