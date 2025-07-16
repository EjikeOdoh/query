
import client from "@/utils/api";
import type { StudentDetail } from "@/utils/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";


async function getStudentDetails(id: any): Promise<StudentDetail | undefined> {
   return client.get(`/students/${id}`)
   .then(res=>res.data)
}

export default function useGetStudentDetails(id: any) {
   return useQuery({
        queryKey:['student', id],
        queryFn: () => getStudentDetails(id),
        placeholderData: keepPreviousData
    })
}