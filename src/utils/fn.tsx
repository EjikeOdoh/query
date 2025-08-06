import type React from "react"
import client from "./api"
import type { CreateStaff, CreateStudentData, CreateStudentPayload, CreateVolunteer, DashStats, GradeAddData, GradeEditData, LoginForm, Participation, ParticipationAddData, ParticipationData, ParticipationEditData, ProgramStat, StaffDetails, StaffPayload, StudentDetail, StudentPagination, VolunteerDetails, VolunteersPayload } from "./types"

// Fetchers
export async function searchStudent(name: string) {
    const res = await client.get(`/students/search?name=${name}`)
    return await res.data
}

export async function getStudentDetails(id: any): Promise<StudentDetail | undefined> {
    return client.get(`/students/${id}`)
        .then(res => res.data)
}

export async function getAllStudents(meta: StudentPagination) {
    return client.get(`/students?page=${meta.page}&limit=${meta.limit}`)
        .then(res => res.data)
}

export async function getAllParticipation(filterOptions: Participation): Promise<ParticipationData[]> {
    const query = Object.entries(filterOptions)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
        .join('&');
    return client.get('/participation/filter').then(res => res.data)
}

export async function getProfile() {
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
            accounting
        }
    }

    try {
        const res = await client.post('/students', payload)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function createGrade(studentId: number, data: GradeAddData) {
    const payload = { studentId, ...data }
    try {
        const res = await client.post('/grades', payload)
        return res.data
    } catch (error) {
        console.log(error)
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
        console.log(error)
    }
}

export async function addVolunteer(data: CreateVolunteer) {
    try {
        const res = await client.post('/volunteers', data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

// Patch functions
export async function updateStudent(id: string, data: any) {
    try {
        const res = await client.patch(`/students/${id}`, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function updateGrade(id: string, data: GradeEditData) {
    try {
        const res = await client.patch(`/grades/${id}`, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function updateParticipation(id: string, data: ParticipationEditData) {
    const payload = {
        // programId: Number(data.program_program),
        quarter: Number(data.participation_quarter),
        year: Number(data.participation_year)
    }

    try {
        const res = await client.patch(`/participation/${data.participation_id}`, payload)
        return res.data
    } catch (error) {
        console.log(error)
    }

}


export async function updateStaff(id: string, data: Partial<CreateStaff>) {
    try {
        const res = await client.patch(`/staff/${id}`, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function updateVolunteer(id: string, data: Partial<CreateVolunteer>) {
     try {
        const res = await client.patch(`/volunteers/${id}`, data)
        return res.data
     } catch (error) {
        console.log(error)
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

// Auth functions
export async function login(payload: LoginForm) {
    try {
        const res = await client.post('/auth/login', payload)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export function logout() {
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');
    window.location.reload();
}


// utility functions
export function updateData<T extends Record<string, any>>(
    e: React.ChangeEvent<HTMLInputElement>,
    setData: React.Dispatch<React.SetStateAction<T>>
) {
    const { name, value, type } = e.target;
    setData(prev => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
    }));
}

export function dateFormatter(arg: Date): string {
    return new Date(arg).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
