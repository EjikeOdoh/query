
import { useState } from "react"
import type { Meta, Student, StudentPagination, StudentResponse } from "../utils/types"
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
import { useDeleteStudent, useGetAllStudents } from "@/hooks/use-students"
import { Button } from "@/components/ui/button"
import { CircleFadingPlus, Trash2 } from "lucide-react"
import Container from "@/components/Container"
import Modal from "@/components/Dialog"
import { useQueryClient } from "@tanstack/react-query"

export default function Students() {

  const [token] = useState(() => {
    return window.sessionStorage.getItem("myToken")
  })

  const navigate = useNavigate()
  const queryClient = useQueryClient()

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

  const { isPending, isError, data, error, refetch } = useGetAllStudents(meta, token)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [sId, setSId] = useState<number>()

  function selectStudent(id: number) {
    setSId(id)
    openModal()
  }

  function cleanUp() {
    refetch()
    queryClient.invalidateQueries({ queryKey: ['stats'] })
    queryClient.invalidateQueries({ queryKey: ['students'] })
  }

  const deleteStudentMutation = useDeleteStudent(sId!, cleanUp)

  function openModal() { setIsDeleteModalOpen(true) }
  function closeModal() { setIsDeleteModalOpen(false) }

  function handleDeleteStudent() {
    closeModal()
    deleteStudentMutation.mutate()
  }



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
    <Container label="Students">
      <div className="flex gap-5 items-center justify-between">
        <SearchForm
          placeholder="Search by student names"
          action={logInput} />
        <Button
          className="bg-[#00AEFF] text-white text-sm"
          onClick={() => navigate('/add-student')}
        >
          <CircleFadingPlus />
          <span>Add Student</span>
        </Button>
      </div>

      <StudentTable data={students} remove={selectStudent} />
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
      <Modal isOpen={isDeleteModalOpen} onClose={closeModal}>
        <div className="space-y-10">
          <div className="space-y-8">
            <Trash2 size={90} className="mx-auto" />
            <div>
              <h3 className="font-bold text-3xl text-center">Delete Student</h3>
              <p className="font-light text-center">Are you sure you want to delete this student?</p>

            </div>

          </div>
          <div className="flex items-center gap-4">
            <Button variant='outline' className="flex-1" onClick={closeModal}>No</Button>
            <Button variant="destructive" className="flex-1" onClick={handleDeleteStudent}>Yes, Delete</Button>
          </div>
        </div>
      </Modal>
    </Container>


  )
}
