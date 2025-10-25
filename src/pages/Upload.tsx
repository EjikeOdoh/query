import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import { SpinnerCustom } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadAttendance } from "@/utils/fn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ban, CloudCheck } from "lucide-react";
import { useNavigate } from "react-router";

export default function Upload() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    function handleSubmit(x: FormData) {
        const file = x.get('file')
        if (!file || !(file instanceof File) || file.size === 0) {
            alert('Please select a valid file')
            return
        }
        uploadMutation.mutate(x)
    }

    const uploadMutation = useMutation({
        mutationFn: uploadAttendance,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stats'] })
            queryClient.invalidateQueries({ queryKey: ['tags'] })
            queryClient.invalidateQueries({ queryKey: ['students'] })
        }
    })

    function goToHistory() {
        closeModal()
        navigate('/upload-history', { replace: true })
    }

    function goToDashboard() {
        closeModal()
        navigate('/dashboard', { replace: true })
    }


    function closeModal() {
        uploadMutation.reset()
    }

    if (uploadMutation.isPending) {
        return (
            <SpinnerCustom />
        )
    }


    return (
        <Container label="Upload Student Attendance">
            <div className="w-full md:w-[600px] m-auto my-5">
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

            {/* Success Modal */}
            <Modal isOpen={uploadMutation.isSuccess} onClose={closeModal}>
                <div className="space-y-10">
                    <div className="space-y-8">
                        <CloudCheck size={90} className="mx-auto" color="#00B548" />
                        <h3 className="font-bold text-3xl text-center">Upload Successful</h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant='default' className="flex-1" onClick={goToHistory}>Go to Upload History</Button>
                        <Button variant="outline" className="flex-1" onClick={goToDashboard}>Go to Dashboard</Button>
                    </div>
                </div>
            </Modal>

            {/* Error Modal */}
            <Modal isOpen={uploadMutation.isError} onClose={closeModal}>
                <div className="space-y-10">
                    <div className="space-y-8">
                        <Ban size={90} className="mx-auto" color="#D92121" />
                        <h3 className="font-bold text-3xl text-center">Upload Failed</h3>
                        <p className="font-light text-center">Please check your Excel file for errors and try again.</p>
                    </div>
                    <div className="flex items-center gap-4">

                        <Button variant="default" className="flex-1" onClick={goToDashboard}>Go to Dashboard</Button>
                        <Button variant='outline' className="flex-1" onClick={closeModal}>Close</Button>
                    </div>
                </div>
            </Modal>
        </Container>
    )
}