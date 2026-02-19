import type React from "react"
import client from "./api"
import type { ApiError, CreateSponsorshipDto, CreateStaff, CreateStudentData, CreateStudentPayload, CreateTargetDto, CreateUserDto, CreateVolunteer, DashStats, EditPartnerDetailsDto, EditSponsorshipDto, EditStudentPayload, EditTargetDto, EditUserDto, EditVolunteerDto, FilterStudentsPayload, GradeAddData, GradeEditData, HistoryTable, LoginForm, ParticipationAddData, ParticipationEditData, ParticipationFilterDto, Partner, PartnerDetails, ProfileState, ProgramStat, ProgressFilterDto, ProgressResponseDto, QuarterlyProgramBreakdown, SearchResult, StaffDetails, StaffPayload, StudentDetail, StudentPagination, StudentResponse, Target, User, VolunteerDetails, VolunteerParticipation, VolunteersPayload } from "./types"
import axios from "axios"

// Fetchers
export async function searchStudent(name: string): Promise<SearchResult> {
    const res = await client.get(`/students/search?name=${name}`)
    return await res.data
}

export async function getStudentDetails(id: number): Promise<StudentDetail | undefined> {
    return client.get(`/students/${id}`)
        .then(res => res.data)
}

export async function getAllStudents(meta: StudentPagination): Promise<StudentResponse> {
    return client.get(`/students?page=${meta.page}&limit=${meta.limit}`)
        .then(res => res.data)
}

// export async function getAllParticipation(filterOptions: Participation): Promise<ParticipationData[]> {
//     const query = Object.entries(filterOptions)
//         .filter(([_, va___lue]) => value !== undefined && value !== null && value !== '')
//         .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
//         .join('&');
//     return client.get('/participation/filter').then(res => res.data)
// }

export async function getProfile(): Promise<ProfileState> {
    const res = await client.get('/auth/profile')
    return res.data
}

export async function getStats(year: number): Promise<DashStats> {
    let res;
    if (year === 0) {
        res = await client.get(`/participation`)
    } else {
        res = await client.get(`/participation?year=${year}`)
    }
    return res.data
}

export async function getProgramBreakdown(year: number): Promise<QuarterlyProgramBreakdown> {
    const res = await client.get(`/participation/breakdown?year=${year}`)
    return res.data
}

export async function getFilteredResults(input: ParticipationFilterDto): Promise<FilterStudentsPayload> {
    let res;
    if (input.year === 0 || !input.year) {
        res = await client.get(`participation/filter-by-country?country=${input.country}&page=${input.page}&limit=${input.limit}`)
    } else {
        res = await client.get(`participation/filter-by-country?country=${input.country}&year=${input.year}&page=${input.page}&limit=${input.limit}`)
    }
    return res.data
}

export async function getYearlyAcademicProgress(input: ProgressFilterDto): Promise<ProgressResponseDto> {
    const res = await client.get(`grades/progress?year=${input.year}&page=${input.page}&limit=${input.limit}`)
    return res.data
}

export async function getFilteredByProgramResults(input: ParticipationFilterDto): Promise<FilterStudentsPayload> {
    let res;
    if (input.year === 0 || !input.year) {
        res = await client.get(`participation/filter-by-program?program=${input.program}&page=${input.page}&limit=${input.limit}`)
    } else {
        res = await client.get(`participation/filter-by-program?program=${input.program}&year=${input.year}&page=${input.page}&limit=${input.limit}`)
    }
    return res.data
}

export async function getPrograms(): Promise<ProgramStat[]> {
    const res = await client.get('/programs')
    return res.data
}

export async function getAllStaff(): Promise<StaffPayload[]> {
    const res = await client.get('/staff')
    return res.data
}

export async function getStaff(id: number): Promise<StaffDetails> {
    return client.get(`/staff/${id}`)
        .then(res => res.data)
}

export async function getAllVolunteers(): Promise<VolunteersPayload[]> {
    const res = await client.get('/volunteers')
    return res.data
}

export async function getVolunteer(id: string): Promise<VolunteerDetails> {
    const res = await client.get(`/volunteers/${id}`)
    return res.data
}


export async function getAllTargets(): Promise<Target[]> {
    const res = await client.get('/target')
    return res.data
}


export async function getAllPartners(): Promise<Partner[]> {
    const res = await client.get(`/partners`)
    return res.data
}

export async function getPartner(id: number): Promise<PartnerDetails> {
    const res = await client.get(`/partners/${id}`)
    return res.data
}

export async function getAllTags(): Promise<HistoryTable[]> {
    const res = await client.get('/tag')
    return res.data
}


export async function getAllUsers(): Promise<User[]> {
    const res = await client.get('/users')
    return res.data
}

// Post functions
export async function createStudent(data: CreateStudentData) {
    const {
        english,
        math,
        chemistry,
        physics,
        government,
        economics,
        biology,
        commerce,
        literature,
        accounting,
        quarter,
        year,
        noOfBrothers,
        noOfSisters,
        ...rest

    } = data

    const payload: CreateStudentPayload = {
        ...rest,
        noOfBrothers: Number(noOfBrothers),
        noOfSisters: Number(noOfSisters),
        year: Number(year),
        quarter: Number(quarter),
        grades: {
            english,
            math,
            chemistry,
            physics,
            government,
            biology,
            commerce,
            literature,
            accounting,
            economics
        }
    }

    try {
        const res = await client.post('/students', payload)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function createGrade(studentId: number, data: GradeAddData) {
    const payload = { studentId, ...data }
    try {
        const res = await client.post('/grades', payload)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function addParticipation(data: ParticipationAddData) {
    const payload = {
        studentId: data.studentId,
        programId: data.program_program,
        quarter: data.participation_quarter,
        year: data.participation_year
    }

    try {
        const res = await client.post('/participation', payload)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function addVolunteer(data: CreateVolunteer) {
    try {
        const res = await client.post('/volunteers', data)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function addVolunteerParticipation(data: VolunteerParticipation) {
    try {
        const res = await client.post('/volunteer-participation', data)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function uploadAttendance(data: FormData) {
    try {
        const res = await client.post('/uploads', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function addTarget(data: CreateTargetDto) {
    try {
        const res = await client.post(`/target`, data)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function addSponsorship(data: CreateSponsorshipDto) {
    try {
        const res = await client.post(`/sponsorship`, data)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function addPartner(data: FormData) {
    try {
        const res = await client.post('/partners', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function addStaff(data: CreateStaff) {
    try {
        const res = await client.post(`/staff`, data)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}


export async function addUser(data: CreateUserDto) {
    try {
        const res = await client.post(`/users`, data)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

// Patch functions
export async function updateStudent(id: string, data: EditStudentPayload) {
    const {progress, ...studentDetails} = data
    try {
        const res = await client.patch(`/students/${id}`, studentDetails)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function updateGrade(id: string, data: GradeEditData) {
    try {
        const res = await client.patch(`/grades/${id}`, data)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function updateParticipation(data: ParticipationEditData) {
    const payload = {
        quarter: Number(data.participation_quarter),
        year: Number(data.participation_year)
    }
    try {
        const res = await client.patch(`/participation/${data.participation_id}`, payload)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}


export async function updateStaff(id: string, data: Partial<CreateStaff>) {
    try {
        const res = await client.patch(`/staff/${id}`, data)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}


export async function updateTarget(id: number, data: EditTargetDto) {
    try {
        const res = await client.patch(`/target/${id}`, data)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function updateVolunteer(id: string, data: EditVolunteerDto) {
    try {
        const res = await client.patch(`/volunteers/${id}`, data)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function editPartner(id: number, data: FormData) {
    try {
        const res = await client.patch(`/partners/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function updatePartnerStatus(id: number, data: EditPartnerDetailsDto) {
    try {
        const res = await client.patch(`/partners/${id}/status`, data)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function updateSponsorship(id: number, data: EditSponsorshipDto) {
    try {
        const res = await client.patch(`/sponsorship/${id}`, data)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

export async function updateUser(id: number, payload?: EditUserDto) {
    try {
        const res = await client.patch(`/users/${id}`, payload)
        return res.data
    } catch (error) {
        throw extractApiError(error)
    }
}

// Delete functions
export async function deleteParticipation(id: number) {
    const res = await client.delete(`/participation/${id}`)
    return res.data
}

export async function deleteGrade(id: number) {
    const res = await client.delete(`/grades/${id}`)
    return res.data
}

export async function deleteStudent(id: number) {
    const res = await client.delete(`/students/${id}`)
    return res.data
}

export async function deleteStaff(id: string) {
    const res = await client.delete(`/staff/${id}`)
    return res.data
}

export async function deleteVolunteer(id: string) {
    const res = await client.delete(`/volunteers/${id}`)
    return res.data
}

export async function deleteTarget(id: number) {
    const res = await client.delete(`/target/${id}`)
    return res.data
}

export async function deleteSponsorship(id: number) {
    const res = await client.delete(`/sponsorship/${id}`)
    return res.data
}

export async function deletePartner(id: number) {
    const res = await client.delete(`/partners/${id}`)
    return res.data
}

export async function deleteUploadTag(tag: string) {
    const res = await client.delete(`/tag/${tag}`)
    return res.data
}

export async function deleteUser(id: number) {
    const res = await client.delete(`/users/${id}`)
    return res.data
}

// Auth functions
export async function login(payload: LoginForm) {
    const res = await client.post('/auth/login', payload)
    return res.data
}

export function logout() {
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');
    window.location.reload();
}


// utility functions
export function capitalize(str: string): string {
    if (!str) return "";

    return str
        .trim()
        .split(/\s+/) // split on any whitespace
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
}


export function updateData<T>(
    e: React.ChangeEvent<HTMLInputElement>,
    setData: React.Dispatch<React.SetStateAction<T>>
) {
    const { name, value, type } = e.target;

    let processedValue: string | number | boolean | Date = value;

    if (type === "number") {
        processedValue = Number(value);
    } else if (type === "checkbox") {
        processedValue = (e.target as HTMLInputElement).checked;
    } else if (type === "text") {
        processedValue = String(processedValue).trim()
    } else {
        processedValue = String(processedValue).trim()
    }


    setData(prev => ({
        ...prev,
        [name]: processedValue,
    }));
}

export function dateFormatter(arg?: Date | string): string {
    if (arg) {
        return new Date(arg).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    return ""
}

export function extractApiError(error: unknown): ApiError | null {
    if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data as ApiError;
    }
    return null;
}

export function extractInitials(firstName: string, lastName: string) {
    return `${firstName.toUpperCase().charAt(0)}${lastName.toUpperCase().charAt(0)}`
}

export function extractNames(data: ProfileState) {
    if (data.staff) {
        return data.staff.firstName + " " + data.staff.lastName
    } else if (data.volunteer) {
        return data.volunteer.firstName + " " + data.volunteer.lastName
    } else if (data.firstName && data.lastName) {
        return data.firstName + " " + data.lastName
    } else {
        return `VF`
    }
}