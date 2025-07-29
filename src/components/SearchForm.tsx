import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

type SearchFormProps = {
  action: string | ((formData: FormData) => void | Promise<void>) | undefined
}

export function SearchForm({ action }: SearchFormProps) {
  return (
    <form action={action} className="flex min-w-1/2 max-w-sm items-center gap-2 border border-[#E5E5E5] rounded-lg overflow-hidden">
      <div className="flex-1 flex items-center gap-4 h-full px-4 rounded-lg">
        <Search color="#808080" />
        <input
          name="name"
          type="text"
          placeholder="Enter Student's name"
          className="flex-1 border-none shadow-none outline-none focus:outline-none focus:border-none focus:ring-0 p-0 font-light text-[#808080] h-full"
          required
        />
      </div>
      <Button type="submit" variant="default" className="bg-[#00AEFF] text-white font-light rounded-none cursor-pointer">
        Search
      </Button>
    </form>
  )
}
