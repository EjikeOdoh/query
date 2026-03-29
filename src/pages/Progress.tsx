import { Down, Up } from "@/components/AcademicProgess";
import Container from "@/components/Container";
import ErrorLayout from "@/components/ErrorLayout";
import Heading from "@/components/Heading";
import { SpinnerCustom } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CurrentYearContext } from "@/context/CurrentYearContext";
import { useGetAllSchools } from "@/hooks/use-dashboard";
import { useGetStudentsAcademicProgress } from "@/hooks/use-students";
import type { ProgressFilterDto } from "@/utils/types";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Progress() {

    const schoolsBreakdown = useGetAllSchools()

    const currentYear = useContext(CurrentYearContext)
    const { state } = useLocation()

    const navigate = useNavigate()
    const [input, setInput] = useState<ProgressFilterDto>({
        year: state.year || currentYear,
        page: 1,
        limit: 10,
        school: ""

    })

    const { data, isLoading, isError, error } = useGetStudentsAcademicProgress(input)

    if (isLoading || schoolsBreakdown.isLoading) {
        return (
            <Container label="Academic Progress">
                <SpinnerCustom />
            </Container>
        )
    }

    if (isError) {
        return <ErrorLayout label="Students Filters" text={error.message} />
    }

    if (data && schoolsBreakdown.data) {
        return (
            <Container label="Progress Report">
                <div className="bg-white rounded-2xl space-y-5">
                    <div className="flex justify-between align-center">
                        <Heading text={`Academic Progress Table for ${input.year}`} />
                        {/* Dropdown for school selection */}
                        <Select
                            value={input.school}
                            onValueChange={(value) => setInput({ ...input, school: value })}
                        >
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder='Filter by school' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value=" ">All</SelectItem>
                                {
                                    schoolsBreakdown.data?.map((school: string) => (
                                        <SelectItem value={school} key={school}>{school}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <Table className="rounded-xl overflow-hidden mt-5">
                        <TableHeader className="">
                            <TableRow className="bg-[#E6F7FF]">
                                <TableHead className="text-[#808080] text-sm font-light min-w-28">First Name</TableHead>
                                <TableHead className="text-[#808080] text-sm font-light min-w-28">Last Name</TableHead>
                                <TableHead className="text-[#808080] text-sm font-light min-w-28">School</TableHead>
                                <TableHead className="text-[#808080] text-sm font-light min-w-28">1st Term Avg</TableHead>
                                <TableHead className="text-[#808080] text-sm font-light min-w-28">2nd Term Avg</TableHead>
                                <TableHead className="text-[#808080] text-sm font-light min-w-28">3rd Term Avg</TableHead>
                                <TableHead className="text-[#808080] text-sm font-light min-w-28 w-28">Progress</TableHead>
                                <TableHead className="text-[#808080] text-sm font-light min-w-28 w-28 text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {data.data.map(p => (
                                <TableRow key={p.studentId}>
                                    <TableCell className="text-[#171717] text-sm font-light" onClick={() => navigate(`/students/${p.studentId}`)}>{p.firstName}</TableCell>
                                    <TableCell className="text-[#171717] text-sm font-light">{p.lastName}</TableCell>
                                    <TableCell className="text-[#171717] text-sm font-light">{p.school}</TableCell>
                                    <TableCell className="text-[#171717] text-sm font-light">{p.firstTermAvg}</TableCell>
                                    <TableCell className="text-[#171717] text-sm font-light">{p.secondTermAvg}</TableCell>
                                    <TableCell className="text-[#171717] text-sm font-light">{p.thirdTermAvg}</TableCell>
                                    <TableCell className="text-[#171717] text-sm font-light">{p.madeProgress ? <Up /> : <Down />}</TableCell>
                                    <TableCell className="flex items-center justify-center">
                                        <Button variant="outline"
                                            onClick={() => navigate(`/students/${p.studentId}`)}>
                                            View Profile
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="flex flex-col md:flex-row gap-5 justify-between items-baseline">
                        <div className="space-y-2">
                            <div className="flex items-center gap-5">
                                <Select onValueChange={(value) => {
                                    setInput({
                                        ...input, limit: Number(value), page: value !== "10" ? 1 : input.page
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
                            <p className="text-sm text-[#808080]">Total student count: <span className="font-bold text-xl">{data.meta.total}</span></p>
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
                </div>
            </Container>
        );
    }
}