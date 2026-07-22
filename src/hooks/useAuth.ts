import { AuthContext, type AuthContextValue } from "@/context/auth"
import { use } from "react"

export function useAuth(): AuthContextValue {
    const context = use(AuthContext)
    if (!context) {
        throw new Error("useAuth hook must be used within an auth provider")
    }
    
    return context
}
