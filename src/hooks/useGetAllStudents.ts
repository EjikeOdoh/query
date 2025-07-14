import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { StudentPagination } from "../types/types";

async function getAllStudents(meta: StudentPagination) {
   return axios.get(`http://localhost:3000/students?page=${meta.page}&limit=${meta.limit}`)
   .then(res=>res.data)
}

export default function useGetAllStudents(meta: StudentPagination) {
   return useQuery({
        queryKey:['students', meta.page, meta.limit],
        queryFn: () => getAllStudents(meta),
        placeholderData: keepPreviousData
    })
}