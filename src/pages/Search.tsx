import { SearchForm } from "@/components/SearchForm";
import StudentTable from "@/components/Table";
import type { SearchResult, Student } from "@/utils/types";
import { searchStudent } from "@/utils/fn";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router";

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
        <div>
            <SearchForm action={logInput} />
            {
                data ? <StudentTable data={students} /> : <p>Search again</p>
            }

        </div>
    )
}