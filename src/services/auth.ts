import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

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

export async function logout(): Promise<void> {
    try {
        await api.post("/auth/logout")
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new AuthError(error.response.data?.error ?? "Logout failed")
        }

        throw new AuthError("Could not reach the server")
    }
}

const AUTH_ENDPOINTS = ["/auth/login", "/auth/signup", "/auth/refresh", "/auth/logout"]
let refreshPromise: Promise<boolean> | null = null
let onSessionExpired: (() => void) | null = null

type RetriableConfig = InternalAxiosRequestConfig & { retry?: boolean }

function refreshSession(): Promise<boolean> {
    refreshPromise ??= api
        .post("/auth/refresh")
        .then(() => true)
        .catch(() => false)
        .finally(() => { refreshPromise = null })
    
    return refreshPromise
}

export const hasSession = refreshSession

export function setOnSessionExpired(handler: (() => void) | null) {
    onSessionExpired = handler
}

api.interceptors.response.use((response) => 
    response,
    async (error: unknown) => {
        if (!axios.isAxiosError(error) || error.response?.status !== 401) {
            return Promise.reject(error)
        }

        const original = error.config as RetriableConfig | undefined
        const isAuthCall = AUTH_ENDPOINTS.some((path) => original?.url?.startsWith(path))

        if (!original || original.retry || isAuthCall) {
            return Promise.reject(error)
        }

        original.retry = true

        if (await refreshSession()) {
            return api(original)
        }

        onSessionExpired?.()
        return Promise.reject(error)
    }
)
