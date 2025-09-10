import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { CallFn, EditStudentPayload, ParticipationAddData, ParticipationEditData, StudentPagination } from "../utils/types";
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

export function useGetStudentDetails<T extends number>(id: T) {
   return useQuery({
        queryKey:['student', id],
        queryFn: () => getStudentDetails(id),
        placeholderData: keepPreviousData
    })
}


export function useUpdateStudent<T extends string>(id: T, data:EditStudentPayload, refetch: CallFn) {
   return useMutation({
      mutationFn: () => updateStudent(id, data),
      onSuccess: refetch
   })
}

export function useAddStudentParticipation(data: ParticipationAddData, refetch: CallFn) {
   return useMutation({
      mutationFn: () => addParticipation(data),
      onSuccess: refetch
   })
}

export function useUpdateStudentParticipation<T extends string>(id:T, data: ParticipationEditData, refetch: CallFn) {
   return useMutation({
      mutationFn: () => updateParticipation(id, data),
      onSuccess: refetch
   })
}

export function useDeleteStudentParticipation(id: number, refetch: CallFn) {
   return useMutation({
      mutationFn: () =>deleteParticipation(id),
      onSuccess: refetch
   })
}

export function useDeleteStudent(id:number, refetch: CallFn) {
   return useMutation({
      mutationFn: () =>deleteStudent(id),
      onSuccess: refetch
   })
}