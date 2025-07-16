import client from "./api"
import type { LoginForm } from "./types"

export async function searchStudent(name: string) {
 const res = await client.get(`/students/search?name=${name}`)
 return await res.data
}

export async function login(payload: LoginForm) {
    try {
        const res = await client.post('/auth/login', payload)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

