import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import RequireAuth from "./components/RequireAuth"
import { Toaster } from "./components/ui/sonner"
import AuthProvider from "./context/AuthProvider"
import RequireUnauth from "./components/RequireUnauth"

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route element={<RequireUnauth />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
            </Routes>
            <Toaster />
        </AuthProvider>
    )
}

export default App
