import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import type { Student } from "@/utils/types"
import { Button } from "./ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useNavigate } from "react-router" 

interface StudentTableProps {
  data: Student[]
}

export default function StudentTable({ data }: StudentTableProps) {
  const navigate = useNavigate()

  return (
    <Table className="rounded-xl">
      <TableHeader className="bg-[#FEF7E6]">
        <TableRow>
          <TableHead className="text-[#808080] text-sm font-light">First Name</TableHead>
          <TableHead className="text-[#808080] text-sm font-light">Last Name</TableHead>
          <TableHead className="text-[#808080] text-sm font-light">School</TableHead>
          <TableHead className="text-[#808080] text-sm font-light">Year Joined</TableHead>
          <TableHead className="text-[#808080] text-sm font-light">Country</TableHead>
          <TableHead className="text-[#808080] text-sm font-light">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(student => (
          <TableRow key={student.id}>
            <TableCell className="text-[#171717] text-sm font-light">{student.firstName}</TableCell>
            <TableCell className="text-[#171717] text-sm font-light">{student.lastName}</TableCell>
            <TableCell className="text-[#171717] text-sm font-light">{student.school}</TableCell>
            <TableCell className="text-[#171717] text-sm font-light">{student.yearJoined}</TableCell>
            <TableCell className="text-[#171717] text-sm font-light">{student.country}</TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => navigate(`/students/${student.id}`)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}