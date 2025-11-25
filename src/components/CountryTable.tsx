import { NavLink } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function CountryTable({ data, year }: { data: { country: string, count: number }[], year: number }) {

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
                        <TableCell>
                            <NavLink
                                to="/student-filter"
                                state={{ country: p.country, year }}
                                className="flex"
                            >
                                {p.country}
                            </NavLink>
                        </TableCell>
                        <TableCell align="right" className="font-bold">
                            <NavLink
                                to="/student-filter"
                                state={{ country: p.country, year }}
                                className="flex justify-end"
                            >
                                {p.count}
                            </NavLink>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}