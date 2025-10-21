import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenReducerContext } from "@/context/TokenContext";
import { extractApiError, login } from "@/utils/fn";
import type { ApiError, TokenAction } from "@/utils/types";
import { useContext, type Dispatch, useState } from "react";
import WhiteLogo from '../assets/whiteLogo.svg'
import { Loader, ShieldOff } from "lucide-react";
import Modal from "@/components/Dialog";

export default function LoginPage() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<ApiError | null>(null)
    const dispatch: Dispatch<TokenAction> = useContext(TokenReducerContext)

    function closeModal() {
        setIsError(false)
    }

    async function handleLogin(formData: FormData) {
        const name = formData.get('name') as string
        const password = formData.get('password') as string
        try {
            setIsLoading(true)
            const res: { token: string } | null = await login({ name, password })
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

    if (isLoading) {
        return <Loader />
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
                        <form action={handleLogin}>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            name="name"
                                            type="text"
                                            placeholder="Enter username"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter password"
                                            required

                                        />
                                    </div>
                                    <Button type="submit" className="w-full p-5">
                                        Login
                                    </Button>
                                </div>
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