import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import type { Student } from "@/types/types"
import { Button } from "./ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useNavigate } from "react-router"

export default function StudentTable(data:Student[]) {

    const navigate = useNavigate()

    return (
        <Table>
        <TableCaption>A list of our students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead className="text-center">First Name</TableHead>
            <TableHead className="text-center">Last Name</TableHead>
            <TableHead className="text-center">Year Joined</TableHead>
            <TableHead className="text-center">Actions</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data.map(student => {
              return <TableRow key={student.id}>
                <TableCell className="font-medium text-left">{student.id}</TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell className="text-center">{student.yearJoined}</TableCell>
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
                        onClick={() => navigate(`/student/${student.id}`)}
                      >Edit </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

              </TableRow>
            })
          }

        </TableBody>
      </Table>
    )
}