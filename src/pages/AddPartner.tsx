import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addPartner } from "@/utils/fn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddPartner() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [isActive, setIsActive] = useState<boolean | null>(null)

    const { mutate, isError, error, isPending } = useMutation({
        mutationFn: (x: FormData) => addPartner(x),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['partners']
            })
            navigate('/partners', { replace: true })
        }
    })

    function handleAddPartner(x: FormData) {
        mutate(x)
    }

    if (isPending) {
        return (
            <div>Loading...</div>
        )
    }

    if (isError) {
        return (
            <div>Error: {error.message}</div>
        )
    }

    return (
        <Container label="Add Partner">
            <div className="w-[600px] m-auto">

                <form action={handleAddPartner} className="space-y-5">
                    <Input
                        name="name"
                        placeholder="Name"
                        required
                    />
                    <Input
                        name="desc"
                        placeholder="Description"
                    />
                    <div className="flex gap-5">
                        <Input
                            name="twitter"
                            placeholder="Twitter"
                        />
                        <Input
                            name="linkedIn"
                            placeholder="LinkedIn"
                        />
                    </div>
                    <div className="flex gap-5">
                        <Input
                            name="year"
                            type="number"
                            placeholder="Start Year"
                            maxLength={4}
                        />
                        <div className="w-full">
                            <Select
                                onValueChange={(val) => {
                                    const boolVal = val === "yes";
                                    setIsActive(boolVal);
                                }}
                            >
                                <SelectTrigger className="flex-1 p-6">
                                    <SelectValue placeholder="Active?" />
                                </SelectTrigger>
                                <SelectContent className="bg-white py-4 w-full">
                                    <SelectGroup>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <input type="hidden" name="isActive" value={isActive ? "true" : "false"} />

                        </div>
                    </div>
                    <Input
                        name="logo"
                        type="file"
                        placeholder="Logo"
                        showLabel={true}
                    />

                    <Button className="w-full mt-5">Add Partner</Button>
                </form>
            </div>
        </Container>
    )
}