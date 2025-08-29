import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function CountryTable({ data }: { data: { country: string, count: number }[] }) {
    return (
        <Table
            className="rounded-xl overflow-hidden"
        >
            <TableHeader>
                <TableRow
                    className="bg-[#FEF7E6] text-muted-foreground"
                >
                    <TableHead className="text-muted-foreground font-semibold">
                        Country
                    </TableHead>
                    <TableHead className="text-right text-muted-foreground font-semibold">
                        Count
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(p => (
                    <TableRow key={p.country}>
                        <TableCell>{p.country}</TableCell>
                        <TableCell className="text-right font-bold">{p.count}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}