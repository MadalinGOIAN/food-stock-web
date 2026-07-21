import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import { Toaster } from "./components/ui/sonner"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
            <Toaster />
        </>
    )
}

export default App
