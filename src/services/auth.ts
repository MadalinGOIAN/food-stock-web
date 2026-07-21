import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export type Credentials = {
    email: string
    password: string
}

export class AuthError extends Error {}

export async function login(credentials: Credentials): Promise<void> {
    try {
        await api.post("/auth/login", credentials)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new AuthError(error.response.data?.error ?? "Login failed")
        }

        throw new AuthError("Could not reach the server")
    }
}
