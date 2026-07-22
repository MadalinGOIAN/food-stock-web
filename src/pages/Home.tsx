import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function Home() {
    const navigate = useNavigate();
    const { setStatus } = useAuth()

    async function handleLogout() {
        await logout()
            .then(() => {
                setStatus("unauthenticated")
                navigate("/login", { replace: true })
            })
            .catch((e) => toast.error(e.message))
    }

    return (
        <>
            <h1>Placeholder home page, only log out for now</h1>
            <Button
                type="button"
                onClick={handleLogout}
                className="w-lg"
            >
                Log out
            </Button>
        </>
    )
}

export default Home
