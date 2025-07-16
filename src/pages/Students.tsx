
import { useState } from "react"
import useGetAllStudents from "../hooks/useGetAllStudents"
import type { Meta, Student, StudentPagination, StudentResponse } from "../utils/types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import StudentTable from "@/components/Table"
import { SearchForm } from "@/components/SearchForm"
import { useNavigate } from "react-router"
import { useLocalStorage } from "react-use"

export default function Students() {

  const [value]  = useLocalStorage("myToken") as string[]

  const navigate = useNavigate()

  function logInput(formData: FormData) {
    const studentName = formData.get('name') as string;
    navigate('/search', {
      state: studentName
    })
  }

  const [meta, setMeta] = useState<StudentPagination>({
    page: 1,
    limit: 20
  })
  const { isPending, isError, data, error } = useGetAllStudents(meta, value)
  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const res: StudentResponse = data
  const students: Student[] = res.data
  const info: Meta = res.meta

  return (
    <>
      <SearchForm action={logInput} />
      <div>Page {meta.page} of {info.totalPages}</div>
      <div className="">
        <Select onValueChange={(value) => {
          setMeta({
            page: 1, limit: Number(value)
          })
        }} >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choose size" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel>Rows per page</SelectLabel>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>

      <StudentTable data={students} />
      {/* {StudentTable(students)} */}

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
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
              info.totalPages > 5 ? (<>
                {
                  [1, 2, 3].map(x => (<PaginationItem
                    key={x}>
                    <PaginationLink
                      isActive={x === meta.page}
                      onClick={() => setMeta({ ...meta, page: x })}
                    >{x}</PaginationLink>
                  </PaginationItem>))
                }

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>

              ) : Array(info.totalPages).fill(0).map((_, i) => i + 1).map(x => (<PaginationItem key={x}>
                <PaginationLink
                  isActive={x === meta.page}
                  onClick={() => setMeta({ ...meta, page: x })}
                >{x}</PaginationLink>
              </PaginationItem>))
            }

            <PaginationItem>
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
    </>
  )
}
