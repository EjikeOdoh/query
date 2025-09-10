import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenReducerContext } from "@/context/TokenContext";
import { login } from "@/utils/fn";
import type { TokenAction } from "@/utils/types";
import { useContext, type Dispatch } from "react";
import WhiteLogo from '../assets/whiteLogo.svg'

export default function LoginPage() {


    const dispatch: Dispatch<TokenAction> = useContext(TokenReducerContext)

    async function handleLogin(formData: FormData) {
        const name = formData.get('name') as string
        const password = formData.get('password') as string
        try {
            const res: { token: string } = await login({ name, password })

            window.sessionStorage.setItem("myToken", res.token)

            dispatch({
                type: "login",
                value: res.token
            })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-primary flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div>
                <img src={WhiteLogo} />
            </div>
            <Card className="md:w-3/5 md:min-3/5  space-y-10">
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
                                        placeholder="user"
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
                                        required
                                        
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}