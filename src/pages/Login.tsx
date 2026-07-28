import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenReducerContext } from "@/context/TokenContext";
import { extractApiError, login } from "@/utils/fn";
import type { ApiError, TokenAction } from "@/utils/types";
import { useContext, type Dispatch, useState } from "react";
import WhiteLogo from '../assets/whiteLogo.svg'
import { Eye, EyeOffIcon, ShieldOff } from "lucide-react";
import Modal from "@/components/Dialog";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [isPassVisible, setIsPassVisible] = useState<boolean>(false)
    const [error, setError] = useState<ApiError | null>(null)
    const dispatch: Dispatch<TokenAction> = useContext(TokenReducerContext)

    function toggleVisible() {
        setIsPassVisible(!isPassVisible)
    }

    function closeModal() {
        setIsError(false)
    }

    async function handleLogin(formData: FormData) {
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        try {
            setIsLoading(true)
            const res: { token: string } | null = await login({ email, password })
            if (res !== null) {
                window.sessionStorage.setItem("myToken", res.token)
                dispatch({
                    type: "login",
                    value: res.token
                })
            }
        } catch (error) {
            setIsError(true)
            setError(extractApiError(error))
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <div className="bg-primary flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div>
                    <img src={WhiteLogo} />
                </div>
                <Card className="space-y-10 w-full md:w-[600px] border-4 rounded-2xl border-[#B0E6FF]">
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl font-bold">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-sm font-light">Kindly enter your login details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleLogin(formData);
                            }}>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="username">Email</Label>
                                        <Input
                                            id="username"
                                            name="email"
                                            type="email"
                                            placeholder="Enter email"
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="password">Password</Label>
                                        <div className="flex border items-center">

                                            <input
                                                placeholder="Enter password"
                                                type={isPassVisible ? 'text' : 'password'} id="password"
                                                name="password"
                                                required
                                                className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30  flex-1 flex h-12 border-input  rounded-sm border bg-transparent px-6 py-1 text-sm transition-[color,box-shadow] outline-none  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-light focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" />
                                            <Button type="button" size={"icon"} className="h-12 w-12 border-l" onClick={toggleVisible}>
                                                {isPassVisible ? <EyeOffIcon size={20} /> : <Eye size={20} />}

                                            </Button>
                                        </div>

                                    </div>
                                </div>
                                <Button type="submit" className="w-full p-5" disabled={isLoading}>
                                    {isLoading && <Spinner />}
                                    Login
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
            <Modal isOpen={isError} onClose={closeModal}>
                <div className="space-y-10">
                    <div className="space-y-8">
                        <ShieldOff size={90} className="mx-auto" color="#D92121" />
                        <div>
                            <h3 className="font-bold text-3xl text-center">Error</h3>
                            {error && <p className="font-light text-center">{error!.message}</p>}
                        </div>
                    </div>
                    <Button variant='default' className="w-full" onClick={closeModal}>Close</Button>
                </div>
            </Modal>
        </>
    )
}