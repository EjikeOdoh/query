import Container from "@/components/Container"
import Header from "@/components/Header"
import { SearchForm } from "@/components/SearchForm"
import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import VolunteerTable from "@/components/VolunteerTable"
import type { StudentPagination, Meta } from "@/utils/types"
import { CircleFadingPlus } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function Volunteers() {

    const navigate = useNavigate()

    const [meta, setMeta] = useState<StudentPagination>({
        page: 1,
        limit: 10
    })

    const info: Partial<Meta> = {

    }

    return (
        <Container label="Volunteers">
            <div className="flex gap-5 items-center justify-between">
                <SearchForm action={"hello"} />
                <Button
                    className="text-sm"
                    onClick={() => navigate('/add-volunteer')}
                >
                    <CircleFadingPlus />
                    <span>Add Volunteer</span>
                </Button>
            </div>
            <VolunteerTable />
            <div className="flex justify-between items-baseline">
                <p className="text-sm font-light">Page {meta.page} of {info.totalPages}</p>
                <div className="w-fit">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem className={`text-[#808080]`}>
                                <PaginationPrevious
                                    isActive={info.hasPreviousPage}
                                    onClick={() => {
                                        if (info.hasPreviousPage) {
                                            setMeta({ ...meta, page: meta.page - 1 })
                                        }
                                    }}
                                />
                            </PaginationItem>
                            {
                                [1, 2, 3].map(x => (<PaginationItem
                                    key={x}>
                                    <PaginationLink
                                        className={`text-[#808080] ${x === meta.page ? 'text-[#009DE6] bg-[#D9F3FF]' : undefined}`}
                                        isActive={x === meta.page}
                                        onClick={() => setMeta({ ...meta, page: x })}
                                    >{x}</PaginationLink>
                                </PaginationItem>))
                            }

                            <PaginationItem
                            >
                                <PaginationLink
                                    className={`text-[#808080]  ${!info.hasNextPage ? 'text-[#009DE6] bg-[#D9F3FF]' : undefined}`}
                                    // isActive={x === meta.page}
                                    onClick={() => setMeta({ ...meta, page: info.totalPages! })}
                                >{info.totalPages}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="text-[#808080]">
                                <PaginationNext
                                    isActive={info.hasNextPage}
                                    onClick={() => {
                                        if (info.hasNextPage) {
                                            setMeta({ ...meta, page: meta.page + 1 })
                                        }
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </Container>
    )
}