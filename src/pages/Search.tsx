import { SearchForm } from "@/components/SearchForm";
import StudentTable from "@/components/Table";
import type { Student } from "@/utils/types";
import { searchStudent } from "@/utils/fn";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import Container from "@/components/Container";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useDeleteStudent } from "@/hooks/use-students";
import Modal from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import { SpinnerCustom } from "@/components/Loader";

export default function Search() {
    const { state }: { state: string } = useLocation()
    const queryClient = useQueryClient()

    const [name, setName] = useState<string>(state)

    function logInput(formData: FormData) {
        const studentName = formData.get('name') as string;
        setName(studentName)
    }

    const { isLoading, isError, error, data, refetch } = useQuery({
        queryKey: ['search', name],
        queryFn: () => searchStudent(name),
        placeholderData: keepPreviousData,
        staleTime: 5 * 60 * 1000,
    })

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [sId, setSId] = useState<number>()
    const [student, setStudent] = useState<Partial<Student>>({})

    function selectStudent(id: number) {
        setSId(id)
        setStudent(data?.students.find(s => s.id === id) as Student)
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


    if (isLoading) {
        return <SpinnerCustom />
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <Container label="Student search">
            <div className="w-fit">
                <NavLink to="/students" className="flex items-center gap-2 text-[#171717] font-light text-xs" replace={true}>
                    <ChevronLeft color="#171717" size={14} />
                    Back to Dashboard
                </NavLink>
            </div>
            <SearchForm action={logInput} />
            {
                data && (data.students.length > 0 ? <StudentTable data={data.students} remove={selectStudent} source="search" query={name} /> : <p className="">Student with name: <span className="font-bold text-xl text-[#00AEEF]">{name}</span> not found.</p>)
            }
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