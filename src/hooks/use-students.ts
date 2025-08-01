import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ParticipationAddData, ParticipationEditData, StudentPagination } from "../utils/types";
import { addParticipation, deleteParticipation, deleteStudent, getAllStudents, getStudentDetails, updateParticipation, updateStudent } from "@/utils/fn";
import { useMutation } from "@tanstack/react-query";

export function useGetAllStudents(meta: StudentPagination, token: string | null) {
   return useQuery({
      queryKey: ['students', meta.page, meta.limit],
      queryFn: () => getAllStudents(meta),
      placeholderData: keepPreviousData,
      staleTime: 5 * 60 * 1000,
      enabled: !!(token)
   })
}

export function useGetStudentDetails(id: any) {
   return useQuery({
        queryKey:['student', id],
        queryFn: () => getStudentDetails(id),
        placeholderData: keepPreviousData
    })
}


export function useUpdateStudent(id: any, data:any, refetch: any) {
   return useMutation({
      mutationFn: () => updateStudent(id, data),
      onSuccess: refetch
   })
}

export function useAddStudentParticipation(data: ParticipationAddData, refetch: any) {
   return useMutation({
      mutationFn: () => addParticipation(data),
      onSuccess: refetch
   })
}

export function useUpdateStudentParticipation(id:any, data: ParticipationEditData, refetch: any) {
   return useMutation({
      mutationFn: () => updateParticipation(id, data),
      onSuccess: refetch
   })
}

export function useDeleteStudentParticipation(id: number, refetch: any) {
   return useMutation({
      mutationFn: () =>deleteParticipation(id),
      onSuccess: refetch
   })
}

export function useDeleteStudent(id:number, refetch: any) {
   return useMutation({
      mutationFn: () =>deleteStudent(id),
      onSuccess: refetch
   })
}