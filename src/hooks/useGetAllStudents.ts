import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { StudentPagination } from "../utils/types";
import client from "@/utils/api";

export async function getAllStudents(meta: StudentPagination) {
   return client.get(`/students?page=${meta.page}&limit=${meta.limit}`)
      .then(res => res.data)
}

export default function useGetAllStudents(meta: StudentPagination, token: string | null) {
   return useQuery({
      queryKey: ['students', meta.page, meta.limit],
      queryFn: () => getAllStudents(meta),
      placeholderData: keepPreviousData,
      staleTime: 5 * 60 * 1000,
      enabled: !!(token)
      
   })
}