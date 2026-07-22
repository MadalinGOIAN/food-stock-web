import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type AuthStatus } from "./auth";
import { hasSession, setOnSessionExpired } from "@/services/auth";

function AuthProvider({ children }: { children: ReactNode }) {
    const [status, setStatus] = useState<AuthStatus>("pending")

    useEffect(() => {
        let cancelled = false

        hasSession().then((ok) => {
            if (!cancelled) {
                setStatus(ok ? "authenticated" : "unauthenticated")
            }
        })

        return () => { cancelled = true }
    }, [])

    useEffect(() => {
        setOnSessionExpired(() => setStatus("unauthenticated"))
        return () => setOnSessionExpired(null)
    }, [])

    return (
        <AuthContext value={{ status, setStatus }}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider
