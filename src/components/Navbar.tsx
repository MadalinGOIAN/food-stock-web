import { LogOut, Menu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from "@/components/mode-toggle";
import { toast } from 'sonner';
import { logout } from '@/services/auth';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from './Logo';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';

const navItems = [
    { label: "Household", to: "/household" },
    { label: "Shopping List", to: "/shopping-list" },
];

function Navbar() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
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
        <header className="z-5 sticky top-0 flex max-h-20 w-full items-center justify-between
            border-b border-border bg-card px-4 py-3"
        >
            <div className="flex items-center gap-8 px-2">
                <Link to="/" aria-label="Home">
                    <Logo className="mx-auto h-12 w-auto"/>
                </Link>

                <nav className="hidden items-center gap-2 md:flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `rounded-md px-3 py-2 text-sm font-semibold transition-colors
                                hover:bg-primary hover:text-card ${
                                    isActive
                                        ? "text-primary"
                                        : "text-foreground"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon-lg"
                            aria-label="Open menu"
                            className="md:hidden"
                        >
                            <Menu className="size-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-44">
                        {navItems.map((item) => {
                            const isActive =
                                pathname === item.to || pathname.startsWith(`${item.to}/`)

                            return (
                                <DropdownMenuItem
                                    key={item.to}
                                    asChild
                                    className="rounded-md px-2 py-1.5 focus:bg-primary focus:text-card"
                                >
                                    <NavLink
                                        to={item.to}
                                        className={`w-full cursor-pointer text-sm font-semibold
                                            transition-colors ${
                                                isActive
                                                    ? "text-primary"
                                                    : "text-foreground"
                                            }`}
                                    >
                                        {item.label}
                                    </NavLink>
                                </DropdownMenuItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    className={pathname === "/settings" ? "text-primary" : undefined}
                    variant="ghost"
                    size="icon-lg"
                    aria-label="Settings"
                    onClick={() => { navigate("/settings")
                     }}
                >
                    <Settings className="size-6" />
                </Button>

                <ModeToggle />

                <Button
                    variant="ghost"
                    size="icon-lg"
                    aria-label="Log out"
                    onClick={() => { handleLogout(); }}
                >
                    <LogOut className="size-6" />
                </Button>
            </div>
        </header>
    );
}

export default Navbar;
