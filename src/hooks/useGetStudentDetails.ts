
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";


async function getStudentDetails(id: any) {
   return axios.get(`http://localhost:3000/students/${id}`)
   .then(res=>res.data)
}

export default function useGetStudentDetails(id: any) {
   return useQuery({
        queryKey:['student', id],
        queryFn: () => getStudentDetails(id),
        placeholderData: keepPreviousData
    })
}