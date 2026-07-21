import axios, { type AxiosResponse } from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export type LoginCredentials = {
    email: string
    password: string
}
export type SignupCredentials = LoginCredentials & { name: string }

export class AuthError extends Error {}

export async function signup(credentials: SignupCredentials): Promise<AxiosResponse> {
    try {
        return await api.post("/auth/signup", credentials)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new AuthError(error.response.data?.error ?? "Signup failed")
        }

        throw new AuthError("Could not reach the server")
    }
}

export async function login(credentials: LoginCredentials): Promise<void> {
    try {
        await api.post("/auth/login", credentials)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new AuthError(error.response.data?.error ?? "Login failed")
        }

        throw new AuthError("Could not reach the server")
    }
}
