import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import type { ParticipationData } from "@/utils/types"
import { Button } from "./ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useNavigate } from "react-router" 

interface PTableProps {
  data: ParticipationData[]
}

export default function PTable({ data }: PTableProps) {
  const navigate = useNavigate()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Country</TableHead>
          <TableHead className="text-left">First Name</TableHead>
          <TableHead className="text-left">Last Name</TableHead>
          <TableHead className="text-left">Program</TableHead>
          <TableHead className="text-left">Quarter</TableHead>
          <TableHead className="text-left">Year</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(p => (
          <TableRow key={p.participationId}>
            <TableCell className="font-medium text-left">{p.country}</TableCell>
            <TableCell className="text-left">{p.firstName}</TableCell>
            <TableCell className="text-left">{p.lastName}</TableCell>
            <TableCell className="text-left">{p.program}</TableCell>
            <TableCell className="text-left">{p.quarter}</TableCell>

            <TableCell className="text-left">{p.year}</TableCell>

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
                    onClick={() => navigate(`/students/${p.studentId}`)}
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