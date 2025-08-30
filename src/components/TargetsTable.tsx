import { type Target } from "@/utils/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Pencil, Trash2 } from "lucide-react"

interface TargetsProps {
    data: Target[]
}

export default function TargetsTable({ data }: TargetsProps) {
    return (
        <Table className="rounded-xl overflow-hidden">
            <TableHeader>
                <TableRow
                    className="bg-[#FEF7E6] text-muted-foreground"
                >
                    <TableHead className="text-muted-foreground font-semibold">
                        Year
                    </TableHead>
                    <TableHead className="text-right text-muted-foreground font-semibold">
                        Target
                    </TableHead>
                    <TableHead className="text-right text-muted-foreground font-semibold">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(x => (
                    <TableRow key={x.id}>
                        <TableCell className="text-[#171717] text-sm font-light">{x.year}</TableCell>
                        <TableCell className="text-[#171717] text-sm font-light text-right">{x.target}</TableCell>
                        <TableCell className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
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