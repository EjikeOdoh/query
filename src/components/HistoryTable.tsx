import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import type { HistoryTable } from "@/utils/types"
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel} from "@tanstack/react-table"
import { hColumns } from "./columns"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "./ui/pagination"
import { useState } from "react"

interface TableProps {
    data: HistoryTable[],
    onDelete: (id: string) => void
}


export default function HistoryTable({ data, onDelete }: TableProps) {

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5
    })

    const columns = hColumns(onDelete)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        autoResetPageIndex: true,
        state: {
            pagination,
        },
        meta: { onDelete }
    })



    function next() {
        setPagination({ ...pagination, pageIndex: table.getCanNextPage() ? pagination.pageIndex + 1 : pagination.pageIndex })
    }

    function prev() {
        setPagination({ ...pagination, pageIndex: table.getCanPreviousPage() ? pagination.pageIndex - 1 : pagination.pageIndex })
    }


    return (
        <div className="space-y-10">

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
                <p className="text-sm font-light">Showing {(pagination.pageIndex * pagination.pageSize) + table.getRowModel().rows.length} of {table.getRowCount().toLocaleString()}</p>
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