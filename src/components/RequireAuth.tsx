import { Navigate, Outlet } from "react-router"
import { useAuth } from "@/hooks/useAuth"
import Loading from "./Loading"

function RequireAuth() {
    const { status } = useAuth()

    if (status === "pending") {
        return <Loading />
    }

    if (status === "unauthenticated") {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default RequireAuth
