import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import type { Student } from "@/utils/types"
import { Button } from "./ui/button"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { useNavigate } from "react-router"

interface StudentTableProps {
  data: Student[]
}

export default function StudentTable({ data }: StudentTableProps) {
  const navigate = useNavigate()

  return (
    <Table className="rounded-xl overflow-hidden">
      <TableHeader className="">
        <TableRow className="bg-[#FEF7E6]">
          <TableHead className="text-[#808080] text-sm font-light min-w-28">First Name</TableHead>
          <TableHead className="text-[#808080] text-sm font-light min-w-28">Last Name</TableHead>
          <TableHead className="text-[#808080] text-sm font-light min-w-28">School</TableHead>
          <TableHead className="text-[#808080] text-sm font-light min-w-28">Year Joined</TableHead>
          <TableHead className="text-[#808080] text-sm font-light min-w-28">Country</TableHead>
          <TableHead className="text-[#808080] text-sm font-light min-w-28 w-28">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        {data.map(student => (
          <TableRow key={student.id}>
            <TableCell className="text-[#171717] text-sm font-light">{student.firstName}</TableCell>
            <TableCell className="text-[#171717] text-sm font-light">{student.lastName}</TableCell>
            <TableCell className="text-[#171717] text-sm font-light">{student.school}</TableCell>
            <TableCell className="text-[#171717] text-sm font-light">{student.yearJoined}</TableCell>
            <TableCell className="text-[#171717] text-sm font-light">{student.country}</TableCell>
            <TableCell className="flex items-center justify-center gap-2">
              <Button variant="ghost" size='icon'
                onClick={() => navigate(`/students/${student.id}`)}
              >
                <Eye color="#171717" />
              </Button>
              <Button variant="ghost" size="icon"
                onClick={() => navigate(`/students/${student.id}`, { state: true })}
              >
                <Pencil color="#171717" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 color="#171717" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}