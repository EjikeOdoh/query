import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { CallFn, EditStudentPayload, ParticipationAddData, ParticipationEditData, ParticipationFilterDto, ProgressFilterDto, StudentPagination } from "../utils/types";
import { addParticipation, deleteParticipation, deleteStudent, getAllStudents, getFilteredByProgramResults, getFilteredResults, getStudentDetails, getYearlyAcademicProgress, updateParticipation, updateStudent } from "@/utils/fn";
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

export function useGetFilteredStudents(input: ParticipationFilterDto) {
   return useQuery({
      queryKey: ['filter', input.country, input.year, input.page, input.limit],
      queryFn: () => getFilteredResults(input),
      staleTime: 5 * 60 * 1000,
   })
}

export function useGetStudentsAcademicProgress(input: ProgressFilterDto) {
   return useQuery({
      queryKey: ['progress', input.year, input.page, input.limit],
      queryFn: () => getYearlyAcademicProgress(input),
      staleTime: 5 * 60 * 1000,
   })
}

export function useGetFilteredByProgramStudents(input: ParticipationFilterDto) {
   return useQuery({
      queryKey: ['filter-program', input.program, input.year, input.page, input.limit],
      queryFn: () => getFilteredByProgramResults(input),
      staleTime: 5 * 60 * 1000,
   })
}

export function useGetStudentDetails<T extends number>(id: T) {
   return useQuery({
      queryKey: ['student', id],
      queryFn: () => getStudentDetails(id),
      placeholderData: keepPreviousData
   })
}


export function useUpdateStudent<T extends string>(id: T, data: EditStudentPayload, refetch: CallFn) {
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

export function useUpdateStudentParticipation(data: ParticipationEditData, refetch: CallFn) {
   return useMutation({
      mutationFn: () => updateParticipation(data),
      onSuccess: refetch
   })
}

export function useDeleteStudentParticipation(id: number, refetch: CallFn) {
   return useMutation({
      mutationFn: () => deleteParticipation(id),
      onSuccess: refetch
   })
}

export function useDeleteStudent(id: number, refetch: CallFn) {
   return useMutation({
      mutationFn: () => deleteStudent(id),
      onSuccess: refetch
   })
}