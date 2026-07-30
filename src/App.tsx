import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Household from "./pages/Household"
import RequireAuth from "./components/RequireAuth"
import { Toaster } from "./components/ui/sonner"
import AuthProvider from "./context/AuthProvider"
import RequireUnauth from "./components/RequireUnauth"
import { ThemeProvider } from "./components/theme-provider"
import ShoppingList from "./pages/ShoppingList"
import Settings from "./pages/Settings"

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <Routes>
                    <Route element={<RequireAuth />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/household" element={<Household />} />
                        <Route path="/shopping-list" element={<ShoppingList />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                    <Route element={<RequireUnauth />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>
                </Routes>
                <Toaster />
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
