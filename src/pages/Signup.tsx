import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { AuthError, signup } from "@/services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleAlert } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import z from "zod"

const signupFormSchema = z.object({
    email: z
        .string()
        .min(1, { error: "Email cannot be empty" })
        .pipe(z.email()),
    name: z
        .string()
        .trim()
        .min(1, { error: "Name cannot be empty" })
        .regex(/^[\p{L}\s'-]+$/u, { error: "Name cannot contain non-letter characters"}),
    password: z
        .string()
        .min(8, { error: "Password should be at least 8 characters long" })
        .regex(/[a-z]/, { error: "Password should contain at least one lowercase letter" })
        .regex(/[A-Z]/, { error: "Password should contain at least one uppercase letter" })
        .regex(/[0-9]/, { error: "Password should contain at least one number" })
        .regex(
            /[^a-zA-Z0-9]/, 
            { error: "Password should contain at least one special character: !@#$%^&*()_+-=[]{};,./<>?" }
        ),
    passwordConfirm: z
        .string()
        .min(1, { error: "Retype password to confirm" })
})
.refine(
    (data) => data.password === data.passwordConfirm, 
    { 
        error: "Passwords do not match",
        path: ["passwordConfirm"]
    }
)

function Signup() {
    const navigate = useNavigate()
    const signupForm = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            passwordConfirm: ""
        }
    })

    async function handleSignup({ passwordConfirm, ...credentials}: z.infer<typeof signupFormSchema>) {
        await signup(credentials)
            .then((response) => {
                toast.success(response.data.message)
                navigate("/login", { replace: true })
            })
            .catch((e) => { 
                signupForm.setError("root", {
                     message: e instanceof AuthError ? e.message : "Signup failed"
                })
            })
    }

    return (
        <div className="flex min-h-dvh items-center justify-center p-4">
            <form
                onSubmit={signupForm.handleSubmit(handleSignup)} 
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
                                {...signupForm.register("email")}
                                aria-invalid={!!signupForm.formState.errors.email}
                            />
                            {signupForm.formState.errors.email && (
                                <FieldError>
                                    {signupForm.formState.errors.email.message}
                                </FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel 
                                htmlFor="name"
                                className="block text-sm font-bold text-foreground"
                            >
                                Full name
                            </FieldLabel>
                            <Input
                                id="name"
                                type="text"
                                autoComplete="name"
                                {...signupForm.register("name")}
                                aria-invalid={!!signupForm.formState.errors.name}
                            />
                            {signupForm.formState.errors.name && (
                                <FieldError>
                                    {signupForm.formState.errors.name.message}
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
                                autoComplete="new-password"
                                {...signupForm.register("password")}
                                aria-invalid={!!signupForm.formState.errors.password}
                            />
                            {signupForm.formState.errors.password && (
                                <FieldError>
                                    {signupForm.formState.errors.password.message}
                                </FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel 
                                htmlFor="confirm-password"
                                className="block text-sm font-bold text-foreground"
                            >
                                Confirm password
                            </FieldLabel>
                            <Input
                                id="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                {...signupForm.register("passwordConfirm")}
                                aria-invalid={!!signupForm.formState.errors.passwordConfirm}
                            />
                            {signupForm.formState.errors.passwordConfirm && (
                                <FieldError>
                                    {signupForm.formState.errors.passwordConfirm.message}
                                </FieldError>
                            )}
                        </Field>
                    </FieldGroup>
                </FieldSet>

                <Dialog 
                    open={!!signupForm.formState.errors.root}
                    onOpenChange={() => signupForm.clearErrors("root")}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <CircleAlert />
                                Signup failed
                            </DialogTitle>
                            <DialogDescription>
                                {signupForm.formState.errors.root?.message}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Button
                    type="submit"
                    size={"lg"}
                    disabled={signupForm.formState.isSubmitting}
                    className="mt-6 w-full"
                >
                    Sign up
                </Button>

                <p className="font-normal mt-12 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-primary hover:text-wasabi-800 dark:hover:text-wasabi-300
                            outline-none focus:ring-2 focus:ring-sidebar-ring rounded-sm"
                    >
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Signup
