import { createContext } from "react"

export type AuthStatus = "pending" | "authenticated" | "unauthenticated"

export type AuthContextValue = {
    status: AuthStatus
    setStatus: (status: AuthStatus) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
