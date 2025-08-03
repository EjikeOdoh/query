import { Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useNavigate } from "react-router"


export default function VolunteerTable() {

    const navigate = useNavigate()

    return (
        <Table className="rounded-xl overflow-hidden">
            <TableHeader className="">
                <TableRow className="bg-[#FEF7E6]">
                    <TableHead className="text-[#808080] text-sm font-light min-w-28">First Name</TableHead>
                    <TableHead className="text-[#808080] text-sm font-light min-w-28">Last Name</TableHead>
                    <TableHead className="text-[#808080] text-sm font-light min-w-28">Program</TableHead>
                    <TableHead className="text-[#808080] text-sm font-light min-w-28">Status</TableHead>
                    <TableHead className="text-[#808080] text-sm font-light min-w-28 w-28">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="text-[#171717] text-sm font-light">Ejike</TableCell>
                    <TableCell className="text-[#171717] text-sm font-light">Odoh</TableCell>
                    <TableCell className="text-[#171717] text-sm font-light">All</TableCell>
                    <TableCell className="text-[#171717] text-sm font-light">Active</TableCell>
                    <TableCell className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size='icon'
                            onClick={() => navigate(`/staff/1`)}
                        >
                            <Eye color="#171717" />
                        </Button>
                        <Button variant="ghost" size="icon"
                            onClick={() => navigate(`/staff/1`, { state: true })}
                        >
                            <Pencil color="#171717" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Trash2 color="#171717" />
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}