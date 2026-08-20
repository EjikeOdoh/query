import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WhiteLogo from '../assets/whiteLogo.svg';
import { Spinner } from "@/components/ui/spinner";
import { type FormEvent, useState } from "react";
import client from "@/utils/api";

export default function Authenticator() {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleSubmitCode(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)
        console.log(data)
        try {
            setIsLoading(true)
            const res = await client.post('/auth/validate-2fa', data);
            console.log(res.data)

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-primary flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div>
                <img src={WhiteLogo} alt="VF logo" className="h-12 md:h-14" />
            </div>

            <Card className="space-y-10 w-full md:w-[520px] border-4 rounded-2xl border-[#B0E6FF]">
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-bold">
                        Two-factor authentication
                    </CardTitle>
                    <CardDescription className="text-sm font-light">
                        Enter the 6-digit code from your authenticator app to continue.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        className="grid gap-6" 
                        onSubmit={handleSubmitCode}>
                        <div className="grid gap-3">
                            <Label htmlFor="code">Authentication code</Label>
                            <Input
                                id="code"
                                name="token"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="000000"
                                maxLength={6}
                                required
                            />
                        </div>

                        <p className="text-sm font-light text-muted-foreground">
                            Open your authenticator app and enter the code shown for this site.
                        </p>

                        <Button type="submit" className="w-full p-5"
                            disabled={isLoading}
                        >
                            Verify code
                            {isLoading && <Spinner />}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}