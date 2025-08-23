import { SearchForm } from "@/components/SearchForm";
import StudentTable from "@/components/Table";
import type { SearchResult, Student } from "@/utils/types";
import { searchStudent } from "@/utils/fn";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import Container from "@/components/Container";
import { ChevronLeft } from "lucide-react";

export default function Search() {
    const { state }: { state: string } = useLocation()

    const [name, setName] = useState<string>(state)

    function logInput(formData: FormData) {
        const studentName = formData.get('name') as string;
        setName(studentName)
    }

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['search', name],
        queryFn: () => searchStudent(name),
        enabled: name !== ""
    })

    if (isLoading) {
        return <span>why Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    let students: Student[] = []
    let count: number

    if (data !== undefined) {
        const res: SearchResult = data
        students = res.students
        count = res.count

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
                data && (students.length > 0 ? <StudentTable data={students} /> : <p className="">Student with name: <span className="font-bold text-xl text-[#00AEEF]">{name}</span> not found.</p> )
            }

        </Container>
    )
}