import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import type { StaffPayload } from "@/utils/types"
import { sColumns } from "./columns"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnFiltersState } from "@tanstack/react-table"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "./ui/pagination"
import { useState } from "react"

interface TableProps {
    data: StaffPayload[],
    onDelete: (id: number) => void
}

export default function StaffTable({ data, onDelete }: TableProps) {

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5
    })

    const [globalFilter, setGlobalFilter] = useState('')
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const columns = sColumns(onDelete)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            pagination,
            globalFilter,
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, _, filterValue) => {
            const search = filterValue.trim().toLowerCase();
            if (!search) return true;

            const firstName = row.original.firstName?.toLowerCase() || "";
            const lastName = row.original.lastName?.toLowerCase() || "";

            const nameParts = search.split(/\s+/);

            if (nameParts.length === 1) {
                return (
                    firstName.includes(nameParts[0]) ||
                    lastName.includes(nameParts[0])
                );
            } else {
                const [part1, part2] = nameParts;

                return (
                    (firstName.includes(part1) && lastName.includes(part2)) ||
                    (firstName.includes(part2) && lastName.includes(part1))
                );
            }
        },

        meta: { onDelete }
    })

    const [filter, setFilter] = useState<string>('all')

    function next() {
        setPagination({ ...pagination, pageIndex: table.getCanNextPage() ? pagination.pageIndex + 1 : pagination.pageIndex })
    }

    function prev() {
        setPagination({ ...pagination, pageIndex: table.getCanPreviousPage() ? pagination.pageIndex - 1 : pagination.pageIndex })
    }

    function applyFilter(columnId: string, value: string | boolean) {
        const col = table.getColumn(columnId)
        if (!col) return
        table.resetColumnFilters()
        if (globalFilter) { return table.resetGlobalFilter() }
        col.setFilterValue(value)
    }

    return (
        <div className="space-y-10">

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Button
                        variant={filter === 'all' ? 'default' : 'secondary'}
                        className="font-light  text-sm border border-[#E5E5E5]"
                        onClick={() => {
                            setFilter('all')
                            table.resetColumnFilters()
                        }}
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === 'active' ? 'default' : 'secondary'}
                        className="font-light text-sm border border-[#E5E5E5]"
                        onClick={() => {
                            setFilter('active')
                            applyFilter('active', true)
                        }}
                    >Active</Button>
                    <Button
                        variant={filter === 'inactive' ? 'default' : 'secondary'}
                        className="font-light text-sm border border-[#E5E5E5]"
                        onClick={() => {
                            setFilter('inactive')
                            applyFilter('active', false)
                        }}
                    >Inactive</Button>

                </div>
                <div className="flex justify-between items-center border border-[#E5E5E5] min-w-1/2 rounded-lg max-w-sm px-4 py-2">
                    <input
                        type="search"
                        value={globalFilter ?? ""}
                        onChange={e => {
                            table.resetColumnFilters()
                            setGlobalFilter(e.target.value)
                        }}
                        placeholder="Search by name..."
                        className="flex-1 border-none shadow-none outline-none focus:outline-none focus:border-none focus:ring-0 p-0 font-light text-[#808080]"
                    />
                </div>
            </div>

            <Table className="rounded-xl overflow-hidden">
                <TableHeader className="">
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id} className="bg-[#FEF7E6]">
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id} className="text-[#808080] text-sm font-light min-w-28">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id} className="text-[#171717] text-sm font-light">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between items-baseline">
                <p className="text-sm font-light">Showing {table.getRowModel().rows.length.toLocaleString()} of {table.getRowCount().toLocaleString()}</p>
                <div className="w-fit">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem className={`text-[#808080]`}>
                                <PaginationPrevious
                                    isActive={table.getCanPreviousPage()}
                                    onClick={prev}
                                />
                            </PaginationItem>


                            <PaginationItem className="text-[#808080]">
                                <PaginationNext
                                    isActive={table.getCanNextPage()}
                                    onClick={next}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}