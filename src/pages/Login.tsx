import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import z from "zod"
import { AuthError, login } from "../services/auth"
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { CircleAlert } from "lucide-react"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useAuth } from "@/hooks/useAuth"

const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, { error: "Email cannot be empty" })
        .pipe(z.email()),
    password: z
        .string()
        .min(1, { error: "Password cannot be empty" })
})

function Login() {
    const navigate = useNavigate()
    const { setStatus } = useAuth()
    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function handleLogin(credentials: z.infer<typeof loginFormSchema>) {
        await login(credentials)
            .then(() => {
                setStatus("authenticated")
                navigate("/", { replace: true })
            })
            .catch((e) => { 
                loginForm.setError("root", {
                    message: e instanceof AuthError ? e.message : "Login failed"
                })
            })
    }

    return (
        <div className="flex min-h-dvh items-center justify-center p-2">
            <form
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="w-full max-w-sm rounded-xl p-8 bg-card border border-border"
            >            
                <Logo className="mx-auto mb-6 h-12 w-auto" />

                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel 
                                htmlFor="email"
                                className="block text-sm font-bold text-foreground"
                            >
                                Email
                            </FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                {...loginForm.register("email")}
                                aria-invalid={!!loginForm.formState.errors.email}
                            />
                            {loginForm.formState.errors.email && (
                                <FieldError>
                                    {loginForm.formState.errors.email.message}
                                </FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel 
                                htmlFor="password"
                                className="block text-sm font-bold text-foreground"
                            >
                                Password
                            </FieldLabel>
                            <Input 
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                {...loginForm.register("password")}
                                aria-invalid={!!loginForm.formState.errors.password}
                            />
                            {loginForm.formState.errors.password && (
                                <FieldError>
                                    {loginForm.formState.errors.password.message}
                                </FieldError>
                            )}
                        </Field>
                    </FieldGroup>
                </FieldSet>

                <Dialog 
                    open={!!loginForm.formState.errors.root}
                    onOpenChange={() => loginForm.clearErrors("root")}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <CircleAlert />
                                Login failed
                            </DialogTitle>
                            <DialogDescription>
                                {loginForm.formState.errors.root?.message}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Button
                    type="submit"
                    size={"lg"}
                    disabled={loginForm.formState.isSubmitting}
                    className="mt-6 w-full"
                >
                    Log in
                </Button>

                <p className="font-normal mt-12 text-center text-sm text-muted-foreground">
                    Don't have an account yet?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-primary hover:text-wasabi-800 dark:hover:text-wasabi-300
                            outline-none focus:ring-2 focus:ring-sidebar-ring rounded-sm"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login
