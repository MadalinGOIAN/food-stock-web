import { useNavigate } from "react-router";

function Home() {
    const navigate = useNavigate();

    function handleLogout() {
        navigate("/login")
    }

    return (
        <>
            <h1>Placeholder home page, only log out for now</h1>
            <button
                type="button"
                onClick={handleLogout}
                className="w-lg rounded-lg bg-wasabi-700 py-2 font-medium text-white transition-colors
                    hover:bg-wasabi-900 focus:ring-2 focus:ring-albescent-white-400"
            >
                Log out
            </button>
        </>
    )
}

export default Home
