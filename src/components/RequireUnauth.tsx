import { useAuth } from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router"
import Loading from "./Loading"

function RequireUnauth() {
    const { status } = useAuth()

    if (status === "pending") {
        return <Loading />
    }

    if (status === "authenticated") {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default RequireUnauth
