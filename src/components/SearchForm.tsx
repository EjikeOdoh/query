import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"

type SearchFormProps = {
  action: string | ((formData: FormData) => void | Promise<void>) | undefined,
  schools?: string[],
  placeholder?: string
}

export function SearchForm({ action, placeholder = "Search", schools = [] }: SearchFormProps) {
  return (
    <form action={action} className="flex flex-col md:flex-row min-w-1/2 items-center gap-2 border border-[#E5E5E5] rounded-lg overflow-hidden p-4 items-stretch">
      <Input
        name="name"
        placeholder={placeholder}
        required
        className="w-full"
      />

      <Select
        name="school"
      >
        <SelectTrigger className="w-full md:w-[200px] ">
          <SelectValue placeholder='Search by school' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=" ">All</SelectItem>
          {
            schools?.map((school: string) => (
              <SelectItem value={school} key={school}>{school}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>

      <Button type="submit" variant="default" className="bg-[#00AEFF] text-white font-light rounded-none cursor-pointer border border-[#00AEFF] rounded-md">
        Search
        <Search />
      </Button>
    </form>
  )
}
