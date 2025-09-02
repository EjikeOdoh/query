import type { Sponsorship } from "@/utils/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface SponsorshipProps {
    data: Sponsorship[],
    edit: (id: number) => void,
    remove: (id: number) => void
}

export default function SponsorshipTable({ data, edit, remove }: SponsorshipProps) {
    return (
        <Table className="rounded-xl overflow-hidden">
            <TableHeader>
                <TableRow className="bg-[#FEF7E6] text-muted-foreground">
                    <TableHead className="text-muted-foreground font-semibold">Year</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Program</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Amount</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">Currency</TableHead>
                    <TableHead className="text-muted-foreground font-semibold">In-Kind Donations</TableHead>
                    <TableHead className="text-right text-muted-foreground font-semibold">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(x => (
                    <TableRow key={x.id}>
                        <TableCell className="text-[#171717] text-sm font-light">{x.year}</TableCell>
                        <TableCell className="text-[#171717] text-sm font-light">{x.program}</TableCell>
                        <TableCell className="text-[#171717] text-sm font-light">{x.amount}</TableCell>
                        <TableCell className="text-[#171717] text-sm font-light">{x.currency}</TableCell>
                        <TableCell className="text-[#171717] text-sm font-light">{x.inkinddonation}</TableCell>
                        <TableCell className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon"
                                onClick={() => edit(x.id)}
                            >
                                <Pencil color="#171717" />
                            </Button>
                            <Button variant="ghost" size="icon"
                                onClick={() => remove(x.id)}
                            >
                                <Trash2 color="#171717" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}