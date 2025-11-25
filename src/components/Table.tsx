/* eslint-disable @typescript-eslint/no-explicit-any */

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { useNavigate } from "react-router"

interface StudentTableProps<TData> {
  data: TData[],
  remove: (id: number) => void,
  source?: string,
  query?: string,
  filter?: boolean
}

export default function StudentTable<TData>({ data, remove, source, query, filter }: StudentTableProps<TData>) {
  const navigate = useNavigate()

  return (
    <Table className="rounded-xl overflow-hidden">
      <TableHeader className="">
        <TableRow className="bg-[#FEF7E6]">
          <TableHead className="text-[#808080] text-sm font-light min-w-28">First Name</TableHead>
          <TableHead className="text-[#808080] text-sm font-light min-w-28">Last Name</TableHead>
          <TableHead className="text-[#808080] text-sm font-light min-w-28">{filter ? "Program" : "School"}</TableHead>
          <TableHead className="text-[#808080] text-sm font-light min-w-28">Country</TableHead>
          <TableHead className="text-[#808080] text-sm font-light min-w-28">{filter ? "Year" : "Year Joined"}</TableHead>
          {filter && <TableHead className="text-[#808080] text-sm font-light min-w-28">Quarter</TableHead>}
          <TableHead className="text-[#808080] text-sm font-light min-w-28 w-28">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        {data.map((student: TData) => (
          <TableRow key={(student as any).id}>
            <TableCell className="text-[#171717] text-sm font-light">{(student as any).firstName || (student as any).firstname}</TableCell>
            <TableCell className="text-[#171717] text-sm font-light">{(student as any).lastName || (student as any).lastname}</TableCell>
            <TableCell className="text-[#171717] text-sm font-light">{filter ? (student as any).program : (student as any).school}</TableCell>
            <TableCell className="text-[#171717] text-sm font-light">{(student as any).country}</TableCell>
            <TableCell className="text-[#171717] text-sm font-light">{filter ? (student as any).year : (student as any).yearJoined}</TableCell>
            {
              filter && <TableCell className="text-[#171717] text-sm font-light">{(student as any).quarter}</TableCell>
            }
            <TableCell className="flex items-center justify-center gap-2">

              {
                filter ? (
                <Button variant="outline"
                  onClick={() => navigate(`/students/${(student as any).id}`, {
                    state: {
                      from: source,
                      openModal: false,
                      query: query
                    },

                  })}
                >
                  View Profile
                </Button> ) : (<Button variant="ghost" size='icon'
                  onClick={() => navigate(`/students/${(student as any).id}`, {
                    state: {
                      from: source,
                      openModal: false,
                      query: query
                    },

                  })}
                >
                  <Eye color="#171717" />
                </Button>)
              }

              {
                !filter && (
                  <Button variant="ghost" size="icon"
                    onClick={() => navigate(`/students/${(student as any).id}`, {
                      state: {
                        from: source,
                        openModal: true,
                        query: query
                      }
                    })}
                  >
                    <Pencil color="#171717" />
                  </Button>
                )
              }
              {
                !filter && (
                  <Button variant="ghost" size="icon"
                    onClick={() => remove((student as any).id)}
                  >
                    <Trash2 color="#171717" />
                  </Button>
                )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}