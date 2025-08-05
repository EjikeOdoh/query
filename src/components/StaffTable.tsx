import { Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { useNavigate } from "react-router"
import type { StaffPayload } from "@/utils/types"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type FilterFn,
} from "@tanstack/react-table"

import { useState, useEffect } from "react"

// -------- Actions Cell Component --------
const ActionsCell: React.FC<{ staff: StaffPayload }> = ({ staff }) => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(`/staff/${staff.id}`)}
      >
        <Eye color="#171717" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          navigate(`/staff/${staff.id}`, { state: { edit: true } })
        }
      >
        <Pencil color="#171717" />
      </Button>
      <Button variant="ghost" size="icon">
        <Trash2 color="#171717" />
      </Button>
    </div>
  )
}

// -------- Custom global filter function --------
// Matches any combination of terms against firstName or lastName (case-insensitive, partial)
const nameSearchFilter: FilterFn<StaffPayload> = (row, columnId, filterValue) => {
  if (!filterValue) return true
  const terms = String(filterValue)
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
  const first = String(row.original.firstName || "").toLowerCase()
  const last = String(row.original.lastName || "").toLowerCase()
  return terms.every((term) => first.includes(term) || last.includes(term))
}

const defaultColumns: ColumnDef<StaffPayload>[] = [
  { accessorKey: "staffId", header: "Staff ID" },
  { accessorKey: "firstName", header: "First Name" },
  { accessorKey: "lastName", header: "Last Name" },
  { accessorKey: "role", header: "Position" },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const staff = row.original as StaffPayload
      return <ActionsCell staff={staff} />
    },
  },
]

interface StaffTableProps {
  data: StaffPayload[]
  columns?: ColumnDef<StaffPayload>[]
}

export default function StaffTable({
  data,
  columns = defaultColumns,
}: StaffTableProps) {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  // debounce input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: nameSearchFilter,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
    },
  })

  // drive global filter from debounced input
  useEffect(() => {
    table.setGlobalFilter(debouncedSearch)
  }, [debouncedSearch, table])

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-2">
        <input
          aria-label="Search by first or last name"
          placeholder="Search first name, last name, or both..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-1 flex-1"
        />
        <div className="text-sm text-gray-600">
          {table.getFilteredRowModel().rows.length} result
          {table.getFilteredRowModel().rows.length === 1 ? "" : "s"}
        </div>
      </div>

      {/* Table */}
      <Table className="rounded-xl overflow-hidden">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-[#FEF7E6]">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-[#808080] text-sm font-light min-w-28"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
