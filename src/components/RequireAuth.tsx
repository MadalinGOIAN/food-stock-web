import { Navigate, Outlet } from "react-router"
import { useAuth } from "@/hooks/useAuth"
import Loading from "./Loading"
import Navbar from "./Navbar"

function RequireAuth() {
    const { status } = useAuth()

    if (status === "pending") {
        return <Loading />
    }

    if (status === "unauthenticated") {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default RequireAuth
