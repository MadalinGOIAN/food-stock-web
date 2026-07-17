import type React from "react"
import { Link, useNavigate } from "react-router"

function Login() {
    const navigate = useNavigate()

    function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        navigate("/", { replace: true })
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <form 
                onSubmit={handleLogin}
                className="w-full max-w-sm rounded-xl bg-albescent-white-50 p-8 border border-albescent-white-200"
            >
                <img className="mx-auto mb-6" src="/food-stock-text-logo.svg" alt="Food Stock" />

                <label className="mb-1 block text-sm font-bold text-albescent-white-950">
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mb-4 w-full rounded-lg border border-albescent-white-200 bg-white px-3 py-2
                        text-albescent-white-950 outline-none focus:border-albescent-white-200 focus:ring-2
                        focus:ring-albescent-white-200"
                />

                <label className="mb-1 block text-sm font-bold text-albescent-white-950">
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mb-6 w-full rounded-lg border border-albescent-white-200 bg-white px-3 py-2
                        text-albescent-white-950 outline-none focus:border-albescent-white-200 focus:ring-2
                        focus:ring-albescent-white-200"
                />

                <button
                    type="submit"
                    className="w-full rounded-lg bg-wasabi-700 py-2 font-medium text-white transition-colors
                        hover:bg-wasabi-900 focus:ring-2 focus:ring-albescent-white-400"
                >
                    Log in
                </button>

                <p className="font-normal mt-12 text-center text-sm text-albescent-white-500">
                    Don't have an account yet?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-wasabi-700 hover:text-wasabi-900"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login
