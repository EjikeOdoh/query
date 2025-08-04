
import { useState } from "react"
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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import StudentTable from "@/components/Table"
import { SearchForm } from "@/components/SearchForm"
import { useNavigate } from "react-router"
import { useGetAllStudents } from "@/hooks/use-students"
import { Button } from "@/components/ui/button"
import { CircleFadingPlus } from "lucide-react"
import Container from "@/components/Container"

export default function Students() {

  const [token] = useState(() => {
    return window.sessionStorage.getItem("myToken")
  })

  const navigate = useNavigate()

  function logInput(formData: FormData) {
    const studentName = formData.get('name') as string;
    navigate('/students/search', {
      state: studentName
    })
  }

  const [meta, setMeta] = useState<StudentPagination>({
    page: 1,
    limit: 10
  })

  const { isPending, isError, data, error } = useGetAllStudents(meta, token)

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    console.log(error)
    return <span>Error: {error.message}</span>
  }

  const res: StudentResponse = data
  const students: Student[] = res.data
  const info: Meta = res.meta

  return (
    <Container label="Student">
      <div className="flex gap-5 items-center justify-between">
        <SearchForm 
        placeholder="Enter Student's name"
        action={logInput} />
        <Button
          className="bg-[#00AEFF] text-white text-sm"
          onClick={() => navigate('/add-student')}
        >
          <CircleFadingPlus />
          <span>Add Student</span>
        </Button>
      </div>
      {/* <div className="">
            <Select onValueChange={(value) => {
              setMeta({
                page: 1, limit: Number(value)
              })
            }} >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={meta.limit} />
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

          </div> */}
      <StudentTable data={students} />
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
              {/* {
                info.totalPages > 5 ? (<>
                  {
                    [1, 2, 3].map(x => (<PaginationItem
                      key={x}>
                      <PaginationLink
                        className="text-[#808080]"
                        isActive={x === meta.page}
                        onClick={() => setMeta({ ...meta, page: x })}
                      >{x}</PaginationLink>
                    </PaginationItem>))
                  }

                  <PaginationItem className="text-[#808080]">
                    <PaginationEllipsis />
                  </PaginationItem>
                </>

                ) : Array(info.totalPages).fill(0).map((_, i) => i + 1).map(x => (<PaginationItem key={x}>
                  <PaginationLink
                    isActive={x === meta.page}
                    onClick={() => setMeta({ ...meta, page: x })}
                  >{x}</PaginationLink>
                </PaginationItem>))
              } */}
              <PaginationItem
              >
                <PaginationLink
                  className={`text-[#808080]  ${!info.hasNextPage ? 'text-[#009DE6] bg-[#D9F3FF]' : undefined}`}
                  // isActive={x === meta.page}
                  onClick={() => setMeta({ ...meta, page: info.totalPages })}
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
