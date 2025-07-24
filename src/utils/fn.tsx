import client from "./api"
import type { LoginForm, Participation, ParticipationData, StudentDetail, StudentPagination } from "./types"


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

export async function getAllParticipation(filterOptions: Participation):Promise<ParticipationData[]> {
    const query = Object.entries(filterOptions)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
    .join('&');

    console.log(query)
    return client.get('/participation/filter').then(res=>res.data)
}

export async function getProfile() {
    const res = await client.get('/auth/profile')
    return res.data
}

export async function getStats(year: number) {
    let res;
    if (year === 0) {
        res = await client.get(`/participation`)
    } else {
        res = await client.get(`/participation?year=${year}`)
    }
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


