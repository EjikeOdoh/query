import { Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useNavigate } from "react-router"
import type { StaffPayload } from "@/utils/types"
import { Active, Inactive } from "./Tags"
import { sColumns } from "./columns"
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "./ui/pagination"

interface TableProps {
    data: StaffPayload[],
    onDelete: (id: number) => void
}

export default function StaffTable({data, onDelete}: TableProps) {

    const navigate = useNavigate()

    const columns = sColumns(onDelete)
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
            pageIndex: 0,
            pageSize: 5
        }
    },
    meta: { onDelete }
    })

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
          <p className="text-sm font-light">Showing {table.getRowModel().rows.length.toLocaleString()} of {table.getRowCount().toLocaleString()}</p>
          <div className="w-fit">
              <Pagination>
                  <PaginationContent>
                      <PaginationItem className={`text-[#808080]`}>
                          <PaginationPrevious
                              isActive={table.getCanPreviousPage()}
                              onClick={() => table.previousPage()}
                          />
                      </PaginationItem>


                      <PaginationItem className="text-[#808080]">
                          <PaginationNext
                              isActive={table.getCanNextPage()}
                              onClick={() => table.getCanNextPage() && table.nextPage()}
                          />
                      </PaginationItem>
                  </PaginationContent>
              </Pagination>
          </div>
      </div>
  </div>
    )
}