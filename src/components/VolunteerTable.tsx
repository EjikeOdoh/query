import { Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useNavigate } from "react-router"
import type { VolunteersPayload } from "@/utils/types"
import { Active, Inactive } from "./Tags"

interface TableProps {
    data: VolunteersPayload[]
}


export default function VolunteerTable({ data }: TableProps) {

    const navigate = useNavigate()

    return (
        <Table className="rounded-xl overflow-hidden">
            <TableHeader className="">
                <TableRow className="bg-[#FEF7E6]">
                    <TableHead className="text-[#808080] text-sm font-light min-w-28">First Name</TableHead>
                    <TableHead className="text-[#808080] text-sm font-light min-w-28">Last Name</TableHead>
                    <TableHead className="text-[#808080] text-sm font-light min-w-28">Type</TableHead>
                    <TableHead className="text-[#808080] text-sm font-light min-w-28">Status</TableHead>
                    <TableHead className="text-[#808080] text-sm font-light min-w-28 w-28">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(volunteer => (
                    <TableRow key={volunteer.id}>
                        <TableCell className="text-[#171717] text-sm font-light">{volunteer.firstName}</TableCell>
                        <TableCell className="text-[#171717] text-sm font-light">{volunteer.lastName}</TableCell>
                        <TableCell className="text-[#171717] text-sm font-light">{String(volunteer.type).toLowerCase()}</TableCell>
                        <TableCell className="text-[#171717] text-sm font-light">{volunteer.active ? <Active /> : <Inactive />}</TableCell>
                        <TableCell className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size='icon'
                                onClick={() => navigate(`/volunteers/${volunteer.id}`)}
                            >
                                <Eye color="#171717" />
                            </Button>
                            <Button variant="ghost" size="icon"
                                onClick={() => navigate(`/volunteers/${volunteer.id}`, { state: true })}
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