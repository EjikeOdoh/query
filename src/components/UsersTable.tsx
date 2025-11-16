import type { Callback, User } from "@/utils/types";
import { uColumns } from "./columns";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface TableProps {
    data: User[],
    onReset: Callback,
    onDelete: Callback,
    onUpdate: Callback
}


export default function UsersTable({ data, onReset, onDelete, onUpdate }: TableProps) {
    const columns = uColumns(onReset, onDelete, onUpdate)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return <Table>
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
}