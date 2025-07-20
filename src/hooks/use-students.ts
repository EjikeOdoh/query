import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { StudentPagination } from "../utils/types";
import { getAllStudents, getStudentDetails } from "@/utils/fn";


export  function useGetAllStudents(meta: StudentPagination, token: string | null) {
   return useQuery({
      queryKey: ['students', meta.page, meta.limit],
      queryFn: () => getAllStudents(meta),
      placeholderData: keepPreviousData,
      staleTime: 5 * 60 * 1000,
      enabled: !!(token)
      
   })
}

export  function useGetStudentDetails(id: any) {
   return useQuery({
        queryKey:['student', id],
        queryFn: () => getStudentDetails(id),
        placeholderData: keepPreviousData
    })
}