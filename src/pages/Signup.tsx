import { Link, useNavigate } from "react-router"

function Signup() {
    const navigate = useNavigate()

    function handleSignup(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        navigate("/login", { replace: true })
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <form
                onSubmit={handleSignup} 
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
                    Full name
                </label>

                <input
                    id="name"
                    type="text"
                    autoComplete="name"
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
                    autoComplete="new-password"
                    required
                    className="mb-6 w-full rounded-lg border border-albescent-white-200 bg-white px-3 py-2
                        text-albescent-white-950 outline-none focus:border-albescent-white-200 focus:ring-2
                        focus:ring-albescent-white-200"
                />
                
                <label className="mb-1 block text-sm font-bold text-albescent-white-950">
                    Confirm password
                </label>

                <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
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
                    Sign up
                </button>

                <p className="font-normal mt-12 text-center text-sm text-albescent-white-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-wasabi-700 hover:text-wasabi-900"
                    >
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Signup
