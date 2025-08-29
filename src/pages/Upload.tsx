import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Upload() {
    function handleSubmit(x: FormData) {
        const data = Object.fromEntries(x)
        console.log(data)
    }
    return (
        <Container label="Upload Student Attendance">
            <div className="w-[600px] m-auto">
            <form action={handleSubmit}>
                <Input
                    name="file"
                    type="file"
                    required
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

                <Button>Upload</Button>
            </form>

            </div>
        </Container>
    )
}