import client from "./api"
import type { LoginForm, StudentDetail, StudentPagination } from "./types"

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

export async function login(payload: LoginForm) {
    try {
        const res = await client.post('/auth/login', payload)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function getProfile() {
    const res = await client.get('/auth/profile')
    return res.data
}

export function logout() {
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');
    window.location.reload();
}

