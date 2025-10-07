import Container from "@/components/Container";
import { SpinnerCustom } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadAttendance } from "@/utils/fn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function Upload() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    function handleSubmit(x: FormData) {
        const file = x.get('file')
        if(!file || !(file instanceof File) || file.size === 0) {
            alert('Please select a valid file')
            return
        }
       uploadMutation.mutate(x)
    }

    const uploadMutation = useMutation({
        mutationFn: uploadAttendance,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ['stats']})
            queryClient.invalidateQueries({queryKey:['tags']})
            navigate('/')
        }
    })

    if(uploadMutation.isPending) {
        return (
              <SpinnerCustom />
        )
    }

    if(uploadMutation.isError) {
        return (
            <div>Error: {uploadMutation.error.message}</div>
        )
    }

    return (
        <Container label="Upload Student Attendance">
            <div className="w-[600px] m-auto my-5">
            <form action={handleSubmit} className="space-y-5">
                <Input
                    name="file"
                    type="file"
                    accept=".xlsx, .xls"
                    required
                    placeholder="Select Attendance"
                />
                <Select
                    name="program"
                    required
                >
                    <SelectTrigger className="w-full px-6">
                        <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent className="bg-white py-4">
                        <SelectGroup>
                            <SelectItem value="ASCG">ASCG</SelectItem>
                            <SelectItem value="CBC">CBC</SelectItem>
                            <SelectItem value="SSC">SSC</SelectItem>
                            <SelectItem value="DSC">DSC</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input
                    name="year"
                    type="number"
                    placeholder="Year of Participation"
                    required
                    maxLength={4}
                />
                <Select
                    name="quarter"
                    required
                >
                    <SelectTrigger className="w-full px-6">
                        <SelectValue placeholder="Select Quarter" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectGroup>
                            <SelectItem value="1">First</SelectItem>
                            <SelectItem value="2">Second</SelectItem>
                            <SelectItem value="3">Third</SelectItem>
                            <SelectItem value="4">Fourth</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button className="w-full mt-5">Upload</Button>
            </form>

            </div>
        </Container>
    )
}